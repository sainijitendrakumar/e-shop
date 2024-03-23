import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    item:{}
}
const CartSlice = createSlice({
    name:'cartItem',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            state.item = action.payload
        }
    }
})

export const {addToCart} = CartSlice.actions

export default CartSlice.reducer