import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    userName: "",
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        createCart(){},
        cleanCart(){}
    }
});

export default cartSlice.reducer;