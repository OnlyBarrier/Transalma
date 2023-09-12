'use client'
import React, { useState } from 'react';
import { Entries, Containers } from '@/utils/types';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const EntriesForm: React.FC = () => {
    const [entry, setEntry] = useState<Entries>({
        name: '',
        date: '',
        sealNumber: '',
        blNumber: '',
        dimensions: '',
        comments: '',
        containerQuantity: '',
        active: true,
        entryNumber: 0,
        containers: [],
    });

    const [newContainers, setNewContainers] = useState<Containers[]>([]);

    const addNewContainerForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const newContainer = {
            ruc: '',
            name: '',
            blNumber: '',
            wareHouseName: '',
            active: true,
            description: '',
            products: [],
        };
        setNewContainers([...newContainers, newContainer]);

        // Actualiza el estado entry.containers
        setEntry((prevEntry) => ({
            ...prevEntry,
            containers: [...prevEntry.containers, newContainer],
        }));
    };
    const handleDateChange = (date: Date | null) => {
        if (date) {
            setEntry((prevState) => ({
                ...prevState,
                date: date.toString(),
            }));
        }
    };
    const handleContainerChange = (index: number, field: string, value: string) => {
        const updatedContainers = [...newContainers];
        updatedContainers[index] = {
            ...updatedContainers[index],
            [field]: value,
        };
        setNewContainers(updatedContainers);

        // Actualiza el estado entry.containers
        setEntry((prevEntry) => {
            const updatedEntry = { ...prevEntry };
            updatedEntry.containers[index] = {
                ...updatedEntry.containers[index],
                [field]: value,
            };
            return updatedEntry;
        });
    };
    const addNewProduct = (containerIndex: any) => {
        setNewContainers((prevContainers) => {
            const updatedContainers = [...prevContainers];
            if (!updatedContainers[containerIndex]) {
                updatedContainers[containerIndex] = {
                    ruc: '',
                    name: '',
                    blNumber: '',
                    active: true,
                    wareHouseName: '',
                    description: '',
                    products: [],
                };
            }

            updatedContainers[containerIndex].products.push({
                clientRuc: '',
                name: '',
                observations: '',
                quantity: '',
                active: true,
            });

            return updatedContainers;
        });
    };
    const handleProductChange = (containerIndex: number, productIndex: number, field: string, value: string) => {
        const updatedContainers = [...newContainers];
        const updatedProducts = [...updatedContainers[containerIndex].products];
        updatedProducts[productIndex] = {
            ...updatedProducts[productIndex],
            [field]: value,
        };
        updatedContainers[containerIndex].products = updatedProducts;
        setNewContainers(updatedContainers);
    };
    const removeLastContainer = () => {
        if (newContainers.length > 0) {
            const updatedContainers = [...newContainers];
            updatedContainers.pop(); // Elimina el último elemento del arreglo
            setNewContainers(updatedContainers);
        }
    };
    const handleSubmit = async () => {
        // Verificar si todos los campos de entry están vacíos
        const entryFields = Object.values(entry);
        const entryIsEmpty = entryFields.every((field) => !field);

        // Verificar si todos los campos de newContainers están vacíos
        const containersAreEmpty = newContainers.every((container) => {
            const containerFields = Object.values(container);
            return containerFields.every((field) => !field);
        });

        // Mostrar los valores por consola si ambos entry y newContainers están vacíos
        if (entryIsEmpty && containersAreEmpty) {
            console.log("faltan campos por llenar")
        } else {
            try {
                // Crear un objeto que contenga los datos de entry, incluyendo containers y productos
                const dataToSend = {
                    entry: entry,
                    containers: newContainers,
                };

                // Realizar una solicitud HTTP POST al servidor
                const response = await axios.post('api/entries', dataToSend);

                // Verificar la respuesta del servidor
                if (response.status === 200) {
                    console.log('Datos enviados exitosamente:', response.data);
                    setEntry({
                        name: '',
                        date: '',
                        sealNumber: '',
                        blNumber: '',
                        dimensions: '',
                        comments: '',
                        containerQuantity: '',
                        active: true,
                        entryNumber: 0,
                        containers: [],
                    })
                    setNewContainers([])
                } else {
                    console.error('Error al enviar datos:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error al enviar datos:', error);
            }
        }
    };
    return (
        <div>
            <div className="bg-gray-800 text-white text-center py-2 rounded-md">
                <h2>Crear Nueva Entrada</h2>
            </div>
            <form className="bg-gray-100 shadow-lg rounded-lg overflow-hidden grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="w-3/4 ml-2 mr-2">
                    <h2 className="block font-semibold mb-1">Selecciona una fecha:</h2>
                    <DatePicker className="border rounded"
                        selected={entry.date ? new Date(entry.date) : null}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy" // Formato de fecha (puedes personalizarlo)
                    />
                </div>

                <div className="w-3/4 ml-2 mr-2">
                    <label htmlFor="name" className="block font-semibold mb-1">Nombre de naviera</label>
                    <input
                        type="text"
                        id="name"
                        value={entry.name}
                        onChange={(e) => setEntry({ ...entry, name: e.target.value })}
                        className="rounded-md p-2 w-full"
                    />
                </div>
                <div className="w-3/4 ml-2 mr-2">
                    <label htmlFor="sealNumber" className="block font-semibold mb-1">Número de Sello</label>
                    <input
                        type="text"
                        id="sealNumber"
                        value={entry.sealNumber}
                        onChange={(e) => setEntry({ ...entry, sealNumber: e.target.value })}
                        className="rounded-md p-2 w-full"
                    />
                </div>
                <div className="w-3/4 ml-2 mr-2">
                    <label htmlFor="blNumber" className="block font-semibold mb-1">Número de BL</label>
                    <input
                        type="text"
                        id="blNumber"
                        value={entry.blNumber}
                        onChange={(e) => setEntry({ ...entry, blNumber: e.target.value })}
                        className="rounded-md p-2 w-full"
                    />
                </div>
                <div className="w-3/4 ml-2 mr-2">
                    <label htmlFor="dimensions" className="block font-semibold mb-1">Dimensiones</label>
                    <input
                        type="text"
                        id="dimensions"
                        value={entry.dimensions}
                        onChange={(e) => setEntry({ ...entry, dimensions: e.target.value })}
                        className="rounded-md p-2 w-full"
                    />
                </div>

       

                <div className="w-full ml-2 mr-2">
                    <label htmlFor="comments" className="block font-semibold mb-1">Detalles</label>
                    <textarea
                        id="comments"
                        value={entry.comments}
                        onChange={(e) => setEntry({ ...entry, comments: e.target.value })}
                        className="rounded-md p-2 w-1/2 h-24"
                    />
                </div>

            </form>
            <div className="bg-gray-800 text-white text-center py-2 mt-4 rounded-md">
                <h2>Crear Containers</h2>
            </div>
            <div>
                {newContainers.map((container, index) => (
                    <div key={index}>
                        <h2 className="text-xl font-semibold mt-2 text-center">Contenedor número: {index + 1}</h2>
                        <form key={index} className="bg-gray-100 shadow-lg rounded-lg overflow-hidden grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="w-3/4 ml-2 mr-2">
                                <label htmlFor={`ruc_${index}`} className="block font-semibold mb-1">RUC</label>
                                <input
                                    type="text"
                                    id={`ruc_${index}`}
                                    name={`ruc_${index}`}
                                    value={container.ruc}
                                    onChange={(e) => handleContainerChange(index, 'ruc', e.target.value)}
                                    className="rounded-md p-2 w-full"
                                />
                            </div>
                            <div className="w-3/4 ml-2 mr-2">
                                <label htmlFor={`containerName_${index}`} className="block font-semibold mb-1">Nombre del cliente</label>
                                <input
                                    type="text"
                                    id={`containerName_${index}`}
                                    name={`containerName_${index}`}
                                    value={container.name}
                                    onChange={(e) => handleContainerChange(index, 'name', e.target.value)}
                                    className="rounded-md p-2 w-full"
                                />
                            </div>
                            <div className="w-3/4 ml-2 mr-2">
                                <label htmlFor={`containerBlNumber_${index}`} className="block font-semibold mb-1">Número BL de Contenedor</label>
                                <input
                                    type="text"
                                    id={`containerBlNumber_${index}`}
                                    name={`blNumber_${index}`}
                                    value={container.blNumber}
                                    onChange={(e) => handleContainerChange(index, 'blNumber', e.target.value)}
                                    className="rounded-md p-2 w-full"
                                />
                            </div>
                            <div className="w-3/4 ml-2 mr-2">
                                <label htmlFor={`wareHouseName_${index}`} className="block font-semibold mb-1">Bodega</label>
                                <input
                                    type="text"
                                    id={`wareHouseName_${index}`}
                                    name={`wareHouseName_${index}`}
                                    value={container.wareHouseName}
                                    onChange={(e) => handleContainerChange(index, 'wareHouseName', e.target.value)}
                                    className="rounded-md p-2 w-full"
                                />
                            </div>
                            <div className="w-3/4 ml-2 mr-2">
                                <label htmlFor={`description_${index}`} className="block font-semibold mb-1">Descripción</label>
                                <textarea
                                    id={`description_${index}`}
                                    name={`description_${index}`}
                                    value={container.description}
                                    onChange={(e) => handleContainerChange(index, 'description', e.target.value)}
                                    className="rounded-md p-2 w-full"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => addNewProduct(index)}
                                className="w-1/2 h-1/2 bg-gray-600 text-white px-2 py-1 mt-4 rounded-lg text-sm hover:bg-gray-900"
                            >
                                Agregar Producto
                            </button>
                        </form>
                        {container.products.map((product, productIndex) => (
                            <div key={productIndex}>
                                <form className="bg-gray-100 shadow-lg rounded-lg overflow-hidden mt-4 p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="mb-4">
                                        <label htmlFor={`productName-${index}-${productIndex}`} className="block font-semibold mb-1">Nombre del Producto</label>
                                        <input
                                            type="text"
                                            id={`productName-${index}-${productIndex}`}
                                            name={`productName-${index}-${productIndex}`}
                                            value={product.name}
                                            onChange={(e) => handleProductChange(index, productIndex, 'name', e.target.value)}
                                            className="rounded-md p-2 w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor={`productQuantity-${index}-${productIndex}`} className="block font-semibold mb-1">Cantidad</label>
                                        <input
                                            type="text"
                                            id={`productQuantity-${index}-${productIndex}`}
                                            name={`productQuantity-${index}-${productIndex}`}
                                            value={product.quantity}
                                            onChange={(e) => handleProductChange(index, productIndex, 'quantity', e.target.value)}
                                            className="rounded-md p-2 w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor={`productObservations-${index}-${productIndex}`} className="block font-semibold mb-1">Observaciones</label>
                                        <textarea
                                            id={`productObservations-${index}-${productIndex}`}
                                            name={`productObservations-${index}-${productIndex}`}
                                            value={product.observations}
                                            onChange={(e) => handleProductChange(index, productIndex, 'observations', e.target.value)}
                                            className="rounded-md p-2 w-full"
                                        />
                                    </div>
                                </form>
                            </div>
                        ))}
                    </div>
                ))}
                <button onClick={addNewContainerForm} className="bg-gray-600 text-white px-4 py-2 mt-4 rounded-xl hover:bg-gray-900">
                    Agregar Nuevo contenedor
                </button>
                <button
                    type="button"
                    onClick={removeLastContainer}
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded-xl hover:bg-red-900"
                >
                    Eliminar Contenedor
                </button>
            </div>
            <button onClick={handleSubmit} className="bg-gray-600 text-white px-4 py-2 mt-4 rounded-xl hover:bg-gray-900">
                Enviar Formulario
            </button>
        </div>
    );
};

export default EntriesForm;