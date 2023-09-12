'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { Shipping } from '@/utils/types';

const FormPage: React.FC = () => {
    const [noComplete, setNoComplete] = useState<boolean>(false); // usado para mostrar un mensaje en caso de que el formulario este incompleto
    const [shippingData, setShippingData] = useState<Shipping>({
        name: "",
        userId: "",
        blNumber: "",
        date: "",
        description: "",
        dimensions: "",
        volume: "",
        containerNumber: "",
        comments: "",
    });


    const handleSendForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(shippingData);
        // Verifica que todos los campos de shippingData excepto userId no estén vacíos
        let isDataValid = true;
        for (const key in shippingData) {
            // @ts-ignore
            if (key !== 'userId' && key !== 'comments' && shippingData[key] === '') {
                isDataValid = false;
                break; // Rompe el bucle si un campo está vacío
            }
        }

        if (isDataValid) {
            try {
                // Realiza la solicitud POST a la ruta api/invoice utilizando Axios
                const response = await axios.post('/api/shipping', shippingData);

                // Aquí puedes manejar la respuesta si es necesario
                console.log('Respuesta del servidor:', response.data);

                // Verifica si el estado de la respuesta es 200
                if (response.status === 200) {
                    // Restablece los valores de shippingData a ""
                    setShippingData({
                        ...shippingData,
                        name: "",
                        blNumber: "",
                        date: "",
                        description: "",
                        dimensions: "",
                        volume: "",
                        containerNumber: "",
                        comments: "",
                    });
                }
            } catch (error) {
                console.error('Error al enviar los datos:', error);
            }
        } else {
            // No todos los campos, excepto userId, están llenos, puedes mostrar un mensaje de error o hacer lo que necesites aquí
            setNoComplete(true);
        }
    };

    const handleInvoiceChange = (name: string, value: string) => {
        const updatedShipping = { ...shippingData };
        // @ts-ignore
        updatedShipping[name] = value;
        setShippingData(updatedShipping)
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="p-6 space-y-2 bg-gray-100 rounded-lg shadow-md w-2/4">
                <div className="items-center justify-center ml-1/2 grid grid-cols-1 ml-64">
                    <label htmlFor="field1" className="font-semibold mb-2 justify-center  text-sm">
                        TRANSALMA INTERNACIONAL S.A
                    </label>
                    <label htmlFor="field2" className="font-semibold mb-4 justify-center text-xs ml-8">
                        155707616-2-2021 DV64
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="block font-semibold mb-1">
                            Nombre de la naviera:
                        </label>
                        <input
                            type="text"
                            id="field2"
                            name="name"
                            className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                            value={shippingData.name}
                            onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="blNumber" className="block font-semibold mb-1">
                            Número BL:
                        </label>
                        <input
                            type="text"
                            id="field5"
                            name="blNumber"
                            className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                            value={shippingData.blNumber}
                            onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="dimensions" className="block font-semibold mb-1">
                            Medidas:
                        </label>
                        <input
                            type="text"
                            id="fieldContainer"
                            name="dimensions"
                            className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                            value={shippingData.dimensions}
                            onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="volume" className="block font-semibold mb-1">
                            Volumen:
                        </label>
                        <input
                            type="text"
                            id="field3"
                            name="volume"
                            className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                            value={shippingData.volume}
                            onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="containerNumber" className="block font-semibold mb-1">
                            Número del contenedor:
                        </label>
                        <input
                            type="text"
                            id="containerNumber"
                            name="containerNumber"
                            className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                            value={shippingData.containerNumber}
                            onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="field3" className="block font-semibold mb-1">
                            Fecha:
                        </label>
                        <input
                            type="text"
                            id="field7"
                            name="date"
                            className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                            value={shippingData.date}
                            onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="block font-semibold mb-1">
                            Descripcion:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                            value={shippingData.description}
                            onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="comments" className="block font-semibold mb-1">
                            Comentarios:
                        </label>
                        <textarea
                            id="comments"
                            name="comments"
                            className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                            value={shippingData.comments}
                            onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
                        />
                    </div>

                </div>
                <button
                    onClick={handleSendForm}
                    className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-400 focus:outline-none"
                >
                    Enviar
                </button>
                <label
                    className="w-full p-2 block font-semibold mb-1"
                >
                    {noComplete ? "Faltan campos obligatorios por completar" : ""}
                </label>
            </form>
        </div>
    );
};

export default FormPage;