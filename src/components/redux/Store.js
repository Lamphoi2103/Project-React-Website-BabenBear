import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './Slice/cartSlice'
import authSlice from './Slice/authSlice'

export const Store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
    },
})