// src/api/auth.ts
import axios from './axios';
//inventory system API's

export const getRoles = () => {
  return axios.get('/admin/getRoles');
};
export const getUsers = () => {
  return axios.get('/admin/getUsers');
};

export const addUser = (formData: any) => {
  return axios.post('/admin/addUser', formData);
};

export const updateUser = (formData: any,id:any) => {
  return axios.put(`/admin/updateUser/${id}`, formData);
};

export const deleteUser = (id:any) => {
  return axios.delete(`/admin/deleteUser/${id}`);
};


//user sign in

export const signinadmin = (credentials: {
  username: string;
  password: string;
}) => {
  return axios.post('/auth/login', credentials);
};


export const signin = (credentials: {
  username: string;
  password: string;
}) => {
  return axios.post('/auth/signin', credentials);
};

//supplier and vendor API's
export const createParty = (partyData:any) => {
  return axios.post('/parties/parties', partyData);
};

export const getAllUsers = () => {
  return axios.get('/parties/allUsers');
};

export const updateParty = (partyData:any,id:any) => {
  return axios.put(`/parties/${id}`, partyData);
};

export const deleteParty = (id:any) => {
  return axios.delete(`/parties/${id}`);
};

export const getLatestPartyNo = (isSupplier:boolean) => {
  return axios.get(`/parties/next-number/${isSupplier}`);
};

//stock management
export const getLastItem = () => {
  return axios.get('/items/last-item');
};

export const addItem = (itemData:any) => {
  return axios.post('/items', itemData);
};
export const getAllItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/items/${page}/${limit}/${search}`);
};

export const updateItem = (updateData:any,id:any) => {
  return axios.put(`/items/${id}`, updateData);
};

export const deleteItem = (id:any) => {
  return axios.delete(`/items/${id}`);
};

//quotations
export const getLastInvoiceNo = () => {
  return axios.get('/quotation/last-item');
};

export const createQuotation = (quotationData:any) => {
  return axios.post('/quotation', quotationData);
};

export const getAllQItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/quotation/${page}/${limit}/${search}`);
};

export const updateQuotation = (updateData:any,id:any) => {
  debugger;
  return axios.put(`/quotation/${id}`, updateData);
};

//sales invoice
export const getLastSINo = () => {
  return axios.get('/salesinvoice/last-item');
};

export const createSalesInvoice = (quotationData:any) => {
  return axios.post('/salesinvoice', quotationData);
};

export const getAllSalesInvoiceItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/salesinvoice/${page}/${limit}/${search}`);
};

export const updateSalesInvoice = (updateData:any,id:any) => {
  return axios.put(`/salesinvoice/${id}`, updateData);
};

//purchasing routes
export const getLastPINo = () => {
  return axios.get('/purchaseinvoice/last-item');
};

export const createPurchaseInvoice = (quotationData:any) => {
  return axios.post('/purchaseinvoice', quotationData);
};

export const getAllPurchaseInvoiceItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/purchaseinvoice/${page}/${limit}/${search}`);
};

export const updatePurchaseInvoice = (updateData:any,id:any) => {
  debugger;
  return axios.put(`/purchaseinvoice/${id}`, updateData);
};

//purchase Return routes
export const getLastPRNo = () => {
  return axios.get('/purchasereturn/last-item');
};

export const createPurchaseReturn = (quotationData:any) => {
  return axios.post('/purchasereturn', quotationData);
};

export const getAllPurchaseReturnItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/purchasereturn/${page}/${limit}/${search}`);
};

export const updatePurchaseReturn = (updateData:any,id:any) => {
  debugger;
  return axios.put(`/purchasereturn/${id}`, updateData);
};


//payment receipts
export const createReceiptVoucher = (body:any) => {
  return axios.post('/paymentreceipt', body);
};

export const getPaymentReceiptWithAccount = (page:number=0,limit:number=10,search="") => {
  return axios.get(`/purchaseinvoice/${page}/${limit}/${search}`);
};

//payment vouchers
export const createPaymentVoucher = (body:any) => {
  return axios.post('/paymentvoucher', body);
};



//sales return
export const getLastSRNo = () => {
  return axios.get('/salesreturn/last-item');
};

export const createSalesReturn = (quotationData:any) => {
  return axios.post('/salesreturn', quotationData);
};

export const getAllSalesReturnItems = (page:number,limit:number=10,search="") => {
  return axios.get(`/salesreturn/${page}/${limit}/${search}`);
};

export const updateSalesReturn = (updateData:any,id:any) => {
  return axios.put(`/salesreturn/${id}`, updateData);
};