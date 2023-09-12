'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { Invoice, InputRow } from '@/utils/types';
import { eInvoice } from '@/utils/eInvoice';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { createSerial } from '@/utils/createSerial';

const FormPage: React.FC = () => {
  const [inputRows, setInputRows] = useState<InputRow[]>([{ input1: '', input2: '' }]);
  const [total, setTotal] = useState<number>(0.0);
  const [taxes, setTaxes] = useState<number>(0.0);
  const [noComplete, setNoComplete] = useState<boolean>(false); // usado para mostrar un mensaje en caso de que el formulario este incompleto
  const [invoiceData, setInvoiceData] = useState<Invoice>({
    serial: "",
    userId: "",
    date: "",
    customerName: "",
    customerId: "",
    description: "",
    value: "",
    total: 0,
    active: true,
    tax: "",
    blNumber: "",
    containerNumber: "",
    nature: "01",
    receiverType: "", //desplegable 01 contribuyente 02 consumidor 03 gobierno 04 extranjero
    rucType: "", // ruc type es un desplegable 1 natural 2 juridico
    paymentMethods: "", // 01: Crédito 02: Efectivo 03: Tarjeta Crédito 04: Tarjeta Débito 08: Transf./Depósito a cta. Bancaria 09: Cheque
  });

  async function sendData() {
    try {
      const response = await axios.post('api/invoice', invoiceData);
      setInvoiceData({
        serial: "",
        userId: "",
        date: "",
        customerName: "",
        customerId: "",
        description: "",
        value: "",
        total: 0,
        active: true,
        tax: "",
        blNumber: "",
        containerNumber: "",
        nature: "",
        receiverType: "",
        rucType: "",
        paymentMethods: "",
      });
      setInputRows([{ input1: '', input2: '' }])
      setNoComplete(false)
      setTaxes(0.0)
      setTotal(0.0)
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
    }
  }

  const handleSendForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await eInvoice(invoiceData)
    await createSerial()
    // @ts-ignore
    const isAnyFieldEmpty = Object.keys(invoiceData).filter((key) => key !== "serial" && key !== "userId").some((key) => invoiceData[key] === "");

    console.log(invoiceData)
    if (isAnyFieldEmpty) {
      setNoComplete(true);
      return; // Detiene el envío del formulario si hay campos vacíos
    } else {
      setNoComplete(false); // Todos los campos tienen valores válidos
    }
    await sendData();
  }

  const handleInvoiceChange = (name: string, value: string) => {
    const updatedInvoice = { ...invoiceData };
    // @ts-ignore
    updatedInvoice[name] = value;
    setInvoiceData(updatedInvoice)
  }

  const sumTotal = () => {
    const validOptions = ["Alquiler", "Alquileres y Almacenaje", "Almacenaje"];

    let tax: number = 0;
    const sumInput2: number = inputRows
      .map((row) => {
        // Convierte input1 a minúsculas y elimina espacios en blanco alrededor
        const input1LowerCase = row.input1.toLowerCase().trim();

        // Verifica si alguna de las opciones válidas está incluida en input1
        const isInput1Valid = validOptions.some((option) =>
          input1LowerCase.includes(option.toLowerCase())
        );

        if (isInput1Valid) {
          tax += (Number(row.input2) / 100) * 7;
        }

        return Number(row.input2);
      })
      .reduce((acc, currentValue) => acc + currentValue, 0);

    setTaxes(Number(tax.toFixed(2)));

    console.log(sumInput2)

    setTotal(sumInput2 + tax);
    setInvoiceData((prevState) => ({
      ...prevState,
      total: total,
      tax: taxes.toString(),
    }));
  };

  function removeLetters(input: string): string {
    return input.replace(/[^0-9.]/g, '');
  }
  const handleInputChange = (rowIndex: number, inputIndex: 1 | 2, value: string) => {
    const updatedInputRows = [...inputRows];
    if (inputIndex === 2) {
      value = removeLetters(value) //  Preventing characters in numbers.
    }
    updatedInputRows[rowIndex][`input${inputIndex}`] = value;
    setInputRows(updatedInputRows);
    let completeDescription: string = "";
    let completeValues: string = "";

    inputRows.map(row => completeDescription = completeDescription + row.input1 + ",")
    inputRows.map(row => completeValues = completeValues + row.input2 + ",")

    if (completeDescription === "," || completeValues === ",") {
      completeDescription = "";
      completeValues = "";
    }

    setInvoiceData(prevState => ({
      ...prevState,
      description: completeDescription,
      value: completeValues,
    }));
    console.log(invoiceData)
    sumTotal();
  };
  const addNewRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRows.length < 7) {
      setInputRows([...inputRows, { input1: '', input2: '' }]);
    }
  };

  const removeRow = (rowIndex: number) => {
    const updatedInputRows = [...inputRows];
    updatedInputRows.splice(rowIndex, 1); // Elimina la fila en el índice rowIndex
    setInputRows(updatedInputRows);
    sumTotal();
  };


  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.name)
    setInvoiceData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log(invoiceData)
  };
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setInvoiceData((prevState) => ({
        ...prevState,
        date: date.toString(),
      }));
    }

  };
  return (
    <div className="max-w-screen-md mx-auto p-4">
      <form className="bg-gray-100 shadow-lg rounded-lg overflow-hidden">
        <div className="">
          <div className="rounded bg-gray-800 grid grid-cols-1 mb-4">
            <label htmlFor="field2" className="font-semibold mb-2 justify-center  ml-64 text-sm text-white">
              TRANSALMA INTERNACIONAL S.A
            </label>
            <label htmlFor="field2" className="font-semibold mb-4  ml-64 text-white justify-center text-xs">
              155707616-2-2021 DV64
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="ml-2 mr-2">
              <label htmlFor="field2" className="block font-semibold mb-1">
                ID(RUC):
              </label>
              <input
                type="text"
                id="field2"
                name="customerId"
                className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                value={invoiceData.customerId}
                onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="ml-2 mr-2">
              <label htmlFor="field3" className="block font-semibold mb-1">
                Nombre del cliente:
              </label>
              <input
                type="text"
                id="field3"
                name="customerName"
                className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                value={invoiceData.customerName}
                onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="ml-2 mr-2">
              <label htmlFor="field5" className="block font-semibold mb-1">
                Número BL:
              </label>
              <input
                type="text"
                id="field5"
                name="blNumber"
                className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                value={invoiceData.blNumber}
                onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="ml-2 mr-2">
              <label htmlFor="containerNumber" className="block font-semibold mb-1">
                Número del contenedor:
              </label>
              <input
                type="text"
                id="fieldContainer"
                name="containerNumber"
                className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
                value={invoiceData.containerNumber}
                onChange={(e) => handleInvoiceChange(e.target.name, e.target.value)}
              />
            </div>
            <div className="ml-2 mr-2">
              <h2 className="block font-semibold mb-1 rounded">Selecciona una fecha:</h2>
              <DatePicker className="border rounded"
                selected={invoiceData.date ? new Date(invoiceData.date) : null}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy" // Formato de fecha (puedes personalizarlo)
              />
            </div>
            <div className="ml-2 mr-2">
              <h2 className="block font-semibold mb-1">Tipo de evento:</h2>
              <select className="border rounded" value={invoiceData.nature} name="nature" onChange={handleDropdownChange}>
                <option className="focus:bg-gray-800" value="">Selecciona una opción</option>
                <option value="01">Venta</option>
                <option value="02">Exportación</option>
                <option value="03">Re-exportación</option>
                <option value="04">Venta de fuente extrajera</option>
                <option value="10">Transferencia/Traspaso</option>
                <option value="11">Devolución</option>
                <option value="20">Compra</option>
                <option value="21">Importación</option>
              </select>
            </div>
            <div className="ml-2 mr-2">
              <h2 className="block font-semibold mb-1">Tipo de cliente:</h2>
              <select className="border rounded" value={invoiceData.receiverType} name="receiverType" onChange={handleDropdownChange}>
                <option className="focus:bg-gray-800" value="">Selecciona una opción</option>
                <option value="01">Contribuyente</option>
                <option value="02">Consumidor final</option>
                <option value="03">Gobierno</option>
                <option value="04">Extranjero</option>
              </select>
            </div>
            <div className="ml-2 mr-2">
              <h2 className="block font-semibold mb-1">Tipo de RUC:</h2>
              <select className="border rounded" value={invoiceData.rucType} name="rucType" onChange={handleDropdownChange}>
                <option className="focus:bg-gray-800" value="">Selecciona una opción</option>
                <option value="01">1</option>
                <option value="02">2</option>
              </select>
            </div>
            <div className="ml-2 mr-2">
              <h2 className="block font-semibold mb-1">Método de pago:</h2>
              <select className="border rounded" value={invoiceData.rucType} name="rucType" onChange={handleDropdownChange}>
                <option className="focus:bg-gray-800" value="">Selecciona una opción</option>
                <option value="01">Crédito</option>
                <option value="02">Efectivo</option>
                <option value="03">Tarjeta Crédito</option>
                <option value="04">Tarjeta Débito</option>
                <option value="08">Transf./Depósito bancario</option>
                <option value="09">Cheque</option>
              </select>
            </div>
          </div>
        </div>
        {inputRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-2 mt-0 ">
            <div className="m-2">
              {rowIndex === 0 && (
                <label htmlFor={`input1-${rowIndex}`} className="font-semibold mb-1 mt-6">
                  Servicios:
                </label>
              )}
              <input
                type="text"
                id={`input1-${rowIndex}`}
                name={`input1-${rowIndex}`}
                value={row.input1}
                onChange={(e) => handleInputChange(rowIndex, 1, e.target.value)}
                className="p-2 border rounded focus:outline-none focus:border-gray-800"
              />
            </div>
            <div className="m-2">
              {rowIndex === 0 && (
                <label htmlFor={`input2-${rowIndex}`} className="font-semibold mb-1 mt-6">
                  Costo:
                </label>
              )}
              <input
                type="text"
                id={`input2-${rowIndex}`}
                name={`input2-${rowIndex}`}
                value={row.input2}
                onChange={(e) => handleInputChange(rowIndex, 2, e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:border-gray-800"
              />
            </div>
            <div className="flex items-center w-full">
              {rowIndex === inputRows.length - 1 && ( // Solo muestra el botón Eliminar para la última fila
                <button
                  onClick={() => removeRow(rowIndex)}
                  className="block font-semibold mb-1"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex  mr-44">
          <label
            className="w-full p-2 block font-semibold mb-1 mt-4"
          >
            Impuestos : {Number.isNaN(taxes) ? "No use mas de un punto en el mismo número" : taxes}
          </label>
          <label
            className="w-full p-2 block font-semibold mb-1 mt-4"
          >
            Total : {Number.isNaN(total) ? "No use mas de un punto en el mismo número" : total}
          </label>
        </div>
        <div className="flex">
          <button
            onClick={addNewRow}
            className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-400 focus:outline-none m-4"
          >
            Agregar Fila
          </button>
        </div>
        <button
          onClick={handleSendForm}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-400 focus:outline-none m-4"
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