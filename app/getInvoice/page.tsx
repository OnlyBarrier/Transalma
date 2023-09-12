'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

const ShowInvoices: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    //const [tax, setTax] = useState<number>(0);
    const itemsPerPage = 3;
    useEffect(() => {
        // Realizar la solicitud GET a la API al cargar el componente
        axios.get('api/invoice')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);


    const handleDeleteInvoice = (id: string) => {
        // Realizar la solicitud DELETE al backend para eliminar la factura con el ID proporcionado
        axios.delete(`api/invoice?id=${id}`)
            .then((response) => {
                // Actualizar el estado de los datos después de la eliminación
                const updatedData = data.filter((item) => item.id !== id);
                setData(updatedData);
            })
            .catch((error) => {
                console.error('Error al eliminar la factura:', error);
            });
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePrint = (item: any) => {
        // Crear una nueva instancia de jsPDF
        const doc = new jsPDF()
        autoTable(doc, { html: '#my-table' })

        // Estilo del título
        doc.setFontSize(18);
        doc.setTextColor(0)
        doc.text('TRANSALMA INTERNACIONAL S.A', 80, 20);
        doc.setFontSize(14);
        doc.text('155707616-2-2021 DV64', 95, 30);
        doc.setFontSize(10);
        doc.text('transalmainternacional@gmail.com', 100, 35);
        doc.text('Calle Luis Felipe Clement, Panamá empresarial, Panamá', 100, 40);


        // Información de la factura
        doc.setFontSize(12);
        doc.text(`Factura con serial:   ${item.serial}`, 15, 65);
        doc.text(`Fecha de facturación:   ${item.date}`, 15, 75);
        doc.text(`Factura a nombre de:   ${item.customerName}`, 15, 85);
        doc.text(`Número BL:   ${item.blNumber}`, 15, 95);
        doc.text(`Número del conenedor:   ${item.containerNumber}`, 15, 105);


        // Crear una tabla para los servicios y valores
        const servicesData = item.description.slice(0, -1).split(','); // Dividir la descripción por comas
        const valuesData = item.value.slice(0, -1).split(',');

        const tableData = [];
        for (let i = 0; i < servicesData.length; i++) {
            tableData.push([servicesData[i], valuesData[i]]);
        }
        autoTable(doc, {
            startY: 120,
            head: [['Servicios', 'Valor']],
            body: tableData,
            theme: 'grid',
            styles: { textColor: [0, 0, 0], halign: 'left' },
            columnStyles: { 0: { cellWidth: 80 } },
        })
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text('____________________________________________________________________', 15, 157 + (tableData.length * 2));
        doc.setFontSize(15);
        doc.text(`Impuestos: ${item.tax}`, 15, 165 + (tableData.length * 2));
        doc.setFontSize(10);
        doc.text('____________________________________________________________________', 15, 167 + (tableData.length * 2));
        doc.setFontSize(15);
        doc.text(`Total: ${item.total}`, 15, 175 + (tableData.length * 2));
        doc.setFontSize(10);
        doc.text('____________________________________________________________________', 15, 177 + (tableData.length * 2));
        doc.setFontSize(6);
        doc.text(`(impuesto incluido)`, 15, 181 + (tableData.length * 2));
        doc.save(`factura_Numero_${item.serial}.pdf`); // Guardar el PDF con un nombre único
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Lista de Facturas</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentItems.map((item) => (
                    <div
                        key={item.serial}
                        className="bg-gray-100 mt-8 p-4 rounded-lg shadow-md transform scale-150% transition-transform duration-300 ease-in-out"
                    >
                        <div className="mb-4 text-center">
                            <h1 className="text-xl font-bold uppercase">
                                TRANSALMA INTERNACIONAL S.A
                            </h1>
                            <p className="text-lg">155707616-2-2021 DV64</p>
                        </div>
                        <h2 className="text-xl font-semibold mt-16">Factura N°: {item.serial}</h2>
                        <p className="text-gray-600">Número BL: {item.blNumber}</p>
                        <p className="text-gray-600">Número del contenedor: {item.containerNumber}</p>
                        <p className="text-gray-600">Fecha: {item.date}</p>
                        <p className="text-gray-600">Nombre: {item.customerName}</p>

                        {/* Renderiza los datos de "description" a la izquierda */}
                        <div className="float-left">
                            <h3 className="text-lg font-semibold">Servicios</h3>
                            <ul className="list-none text-gray-600">
                                {item.description.split(',').map((word: string, index: React.Key | null | undefined) => (
                                    <li key={index} className="mb-2">{word.trim()}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Renderiza los datos de "value" a la derecha */}
                        <div className="float-right">
                            <h3 className="text-lg font-semibold">Valor</h3>
                            <ul className="list-none text-gray-600">
                                {item.value.split(',').map((word: string, index: React.Key | null | undefined) => (
                                    <li key={index} className="mb-2">{word.trim()}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="clear-both"></div>
                        <div className="float-left mt-8">
                            <h3 className="text-lg font-semibold">Impuestos:      {item.tax}
                            </h3>
                        </div>
                        <div className="clear-both"></div>
                        <div className="float-left mt-4">
                            <h3 className="text-lg font-semibold">Total:      {item.total}
                            </h3>
                        </div>
                        <div className="clear-both mt-16">
                            <button
                                onClick={() => handleDeleteInvoice(item.id)}
                                className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-gray-400 focus:outline-none hover:text-gray-800"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => handlePrint(item)}
                                className="bg-gray-800 text-white float-right px-3 py-1 rounded-md hover:bg-gray-400 focus:outline-none hover:text-gray-800"
                            >
                                Imprimir
                            </button>
                        </div>
                    </div>

                ))}
            </div>
            <div className="mt-4 flex justify-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-400'
                            }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <input></input>
            </div>
        </div>
    );
};

export default ShowInvoices;