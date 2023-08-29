import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   id: "",
   customer: "",
   phone: "",
   address: "",
   priority: false,
   estimatedDelivery: "",
   gpsCoordanetes:"",
   cart: []
}


const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        createOrder(){},
        placeOrder(){},
        setPriority(){}
    }
});


export default orderSlice.reducer