export type DataTable = {
  id: number;
  name: string;
  quantity: number;
  progres: number;
  date: string;
};

export type allDataTable = {
  total_data: number;
  total_data_filtered: number;
  current_page: number;
  total_page: number;
  next: boolean;
  back: boolean;
  search: string;
  limit: number;
  offset: 0;
  sort: string;
  order: string;
  error: string;
  status: string;
  message: string;
  data: DataTable[];
};
export type DataTables = {
  id: number;
  transaction_date: string;
  invoice_id: string;
  customer_name: string;
  tax: string;
  discount: string;
  subtotal: number;
  total_price: number;
  detail: DataTableDetail[];
};

export type DataTableDetail = {
  id?: number;
  product_id: number;
  quantity: number;
  price: number;
};

export type DataProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type DataPostSale = {
  transaction_date: string;
  invoice_id: string;
  customer_name: string;
  subtotal: number;
  tax: string;
  discount: string;
  total_price: number;
  detail: DataTableDetail[];
};
