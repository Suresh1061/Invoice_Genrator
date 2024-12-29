import { productType, userType } from './../types/index';
import { initialStateType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: initialStateType = {
     user: null,
     token: null,
     status: false,
     subTotalPrice: 0,
     products: [],
     invoice: {
          invoiceNumber: "",
          customerName: "",
          customerEmail: "",
          finalPrice: 0,
          products: []
     }
}

const productSlice = createSlice({
     name: "product",
     initialState,
     reducers: {
          addProduct: (state, action: PayloadAction<productType>) => {
               const { qty, price } = action.payload
               state.subTotalPrice += qty * price
               state.products.push({ ...action.payload })
          },
          deleteProduct: (state, action: PayloadAction<productType>) => {
               const { id, qty, price } = action.payload
               state.subTotalPrice -= qty * price;
               state.products = state.products.filter((product) => product.id !== id)
          },
          addInvoiceDetails: (state, action: PayloadAction<{ id: string, products: productType[], subTotalPrice: number }>) => {
               const { id, products, subTotalPrice } = action.payload
               state.invoice.customerName = state.user!.name;
               state.invoice.customerEmail = state.user!.email;
               state.invoice.invoiceNumber = id;
               state.invoice.finalPrice = subTotalPrice;
               state.invoice.products = products;
          },
          resetInvoice: (state) => {
               state.invoice = {
                    invoiceNumber: "",
                    customerName: "",
                    customerEmail: "",
                    finalPrice: 0,
                    products: []
               }
          },
          updateCurrentUser: (state, action: PayloadAction<{ user: userType, token: string }>) => {
               state.user = action.payload.user
               state.token = action.payload.token
               state.status = true;
          },
          logoutUser: (state) => {
               state.user = null;
               state.token = null;
               state.status = false;
          },
     }
})


export const {
     updateCurrentUser,
     logoutUser,
     addProduct,
     deleteProduct,
     addInvoiceDetails,
     resetInvoice
} = productSlice.actions;

export default productSlice.reducer;