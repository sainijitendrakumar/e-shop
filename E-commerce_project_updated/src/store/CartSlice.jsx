import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    item:null
}
const CartSlice = createSlice({
    name:'cartItem',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            state.item = action.payload
        },
        clearCart:(state)=>{
               state.item = null
        }
    }
})

export const {addToCart,clearCart} = CartSlice.actions

export default CartSlice.reducer