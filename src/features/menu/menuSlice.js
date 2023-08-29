import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    menu: [],
    isLoading: false
} 

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers:{
        createMenu(){},
        addToCart(){}
    }
})

export default menuSlice.reducer