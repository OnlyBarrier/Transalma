export function changeOptions(options: any, invoiceData: any) {
  console.log(options.body.information);
  const securityCodeOptions: string[] = [
    "000000001",
    "999999991",
    "900000090",
    "100000000",
  ];
  const bodyObject = JSON.parse(options.body);

  // Modifica los campos
  bodyObject.information.nature = invoiceData.nature;
  //bodyObject.information.numeration = invoiceData.serial;
  bodyObject.information.securityCode =
    securityCodeOptions[Math.floor(Math.random() * 4)];
  bodyObject.receiver.type = "01"; //crear campo en invoice Data
  //bodyObject.receiver.ruc.ruc = invoiceData.customerId;
  bodyObject.receiver.ruc.type = 1; // crear campo en invoice Data CONVERTIR A INT
  //bodyObject.items  crear una función para llenar el campo items
  //bodyObject.totals.paymentMethods[0].amount = invoiceData.total;// calcular el total
  //bodyObject.totals.paymentMethods[0].paymentMethods = invoiceData.paymentMethods
  // Convierte el objeto modificado de nuevo a JSON
  const newBodyString = JSON.stringify(bodyObject);

  // Actualiza la propiedad 'body' en las opciones originales
  options.body = newBodyString;
}

const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImU1ZTEzYzFiLTJiYTgtNGYzOC1hNWMxLTQ5NWEzMjk3ZjE4ZiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTI0NDFjYy1jMmQ4LTQxNTAtYWE2Mi04NzhlODI1MDRmZWQiLCJlbWFpbCI6ImFwY29udGVzdEBhbGFudWJlLmNvIiwic2NvcGUiOiJjLmQuci51OmFwaXBhbl9mdWxsX2FjY2VzcyBnZW5lcmljIiwiaXNzIjoic2FuZC1hdXRoLWFwaS5hbGVncmEuY29tIiwiaWF0IjoxNjYzMTY0MTUxLCJleHAiOjExNzE3MzQwMjIsImp0aSI6IjliZTRmYTg3LWI4MzMtNDgxZi1hMWNjLTg3YzA3OTNiNWQzZiJ9.bH0VsJ2WbRj5_hetqfyXq95Gm7Ex4fceQpuQpYcBK0wA8ne-nF1qN8yIVl1Q9VC92-KI6oTo7q1hrAT6pXbVyT6erYZNzeP7OHjQ3_iEfjxaUi4_YPzaivSZN3zckaeB8LI4Dc0a3aTYoVMSkb7dpRLKFfu0AOFMwfdWVQRiHuKmKUBAUbgoTwZGdsLeDzN9_56NMYm17X8br_XU6WDOa8dJGd4G4WsndVeNtlaDhu57e3N-d7bnftCD0RAXyD7mq3NHyZp_GO6vOlCVbRPKZ3MQkF3YGNSTAHaayXNDC5fVimPRmApX9G-AduPypmtHb-i9NTp_ejfJy-lSIzO3Bg",
  },
  body: JSON.stringify({
    information: {
      issueType: "01", // estatico en 01
      documentType: "08", //  estatico en 08
      cafe: { format: 3, delivery: 3 }, //estatico en 1
      nature: "01", // desplegable en 01: Venta 02: Exportación 03: Re-exportación 04: Venta de fuente extrajera 10: Transferencia/Traspaso 11: Devolución 20: Compra 21: Importación
      operationType: 1, //  estatico en 1
      destination: 1, // estatico en 1  panamá
      receiverContainer: 1, //estatico en 1
      numeration: "0000000001", //serial
      billingPoint: "001", // estatico en 001
      securityCode: "000000001", // random entre 000000001  999999991  900000090  100000000
    },
    receiver: {
      type: "01",   // 01 contribuyente y 03 gobierno requieren ruc---- 00 y 04 no requieren
      ruc: { type: 2, ruc: "25022201-3-2014" }, // juridico 2(RUC)  natural 1(Cedula)
      country: "PA",
      name: "NUEVA ASOCIACION DE PRODUC DE ARROZ",
      address: "CHIRIQUI",
      location: {
        code: "9-12-5",
        correction: "David (Cabecera)", 
        district: "David",
        province: "Chiriqui",
      },
      telephones: ["6448-6525"],
      exportation: { incoterm: "EXW" },
      emails:["cris-a2112@hotmail.com"],
    }, //type es un desplegable 01 contribuyente 02 consumidor final 03 gobierno 04 extranjero y ruc type es un desplegable 1 natural 2 juridico

    items: [
      {
        prices: { transfer: 25 }, //precio del objeto
        itbms: { rate: "01" }, // impuesto 00 ninguno 01 7%
        description: "alquiler ", //matchearla con la descripción del objeto
        quantity: 1, //cantidad
        number: "0001", // secuencial del item, 1 sería 0001  si fuera el 3 seria 0003
      },
    ],
    totals: {
      paymentTime: 1,
      paymentMethods: [{ type: "02", amount: 26.75 }], // 01: Crédito 02: Efectivo 03: Tarjeta Crédito 04: Tarjeta Débito 08: Transf./Depósito a cta. Bancaria 09: Cheque // amount = precio
    },
  }),
};

export async function eInvoice(invoiceData: any) {
  //changeOptions(options, invoiceData);
  fetch(
    "https://sandbox-api.alanube.co/pan/v1/invoices?idCompany=01GCY56M10RX63QG8P4SGN0935",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
