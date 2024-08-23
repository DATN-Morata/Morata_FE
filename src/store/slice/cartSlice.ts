import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItemsResponse } from '~/types/cart/CartResponse';
type IinitialState = {
    cartOpen: boolean;
    items: ICartItemsResponse[];
};
const initialState: IinitialState = {
    cartOpen: false,
    items: [],
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setOpen: (state) => {
            state.cartOpen = true;
        },
        setClose: (state) => {
            state.cartOpen = false;
        },
        setItemsCart: (state, payload: PayloadAction<ICartItemsResponse[]>) => {
            state.items = payload.payload;
        },
        removeItems: (state, payload: PayloadAction<string>) => {
            const filteredItems = state.items.filter((item) => item.productVariation._id !== payload.payload);
            state.items = filteredItems;
        },
        addItems: (state, payload: PayloadAction<ICartItemsResponse>) => {
            state.items.push(payload.payload);
        },
        removeAll: (state) => {
            state.items = [];
        },
    },
});
export const { setClose, setOpen, setItemsCart, removeItems, addItems, removeAll } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
