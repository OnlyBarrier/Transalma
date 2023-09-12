export interface Invoice {
  serial: string;
  userId: string;
  date: string;
  customerName: string;
  customerId: string;
  description: string;
  value: string;
  total: number;
  active: boolean;
  tax: string;
  blNumber: string;
  containerNumber: string;
  nature: string; // el tipo de venta
  receiverType: string;
  rucType: string;
  paymentMethods: string;
}

export interface Shipping {
  name: string;
  userId: string;
  blNumber: string;
  date: string;
  description: string;
  dimensions: string;
  volume: string;
  containerNumber: string;
  comments: string;
}

export interface InputRow {
  input1: string;
  input2: string;
}

export interface Entries {
  name: string;
  date: string;
  sealNumber: string;
  blNumber: string;
  dimensions: string;
  comments: string;
  containerQuantity: string;
  active: boolean;
  entryNumber: number;
  containers: Containers[];
}

export interface Containers {
  ruc: string;
  name: string;
  blNumber: string;
  active: boolean;
  wareHouseName: string;
  description: string;
  products: Products[];
}

export interface Products {
  clientRuc: string;
  name: string;
  observations: string;
  active: boolean;
  quantity: string;
}
