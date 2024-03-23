import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice'


 const store = configureStore({
    reducer:{
        cartItem:cartReducer
    }
})

export default store