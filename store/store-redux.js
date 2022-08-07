import {configureStore, createSlice} from  "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[],
        total:0
    },
    reducers:{
        addItemToCart(state,action){
            const newItem = action.payload;
            state.total += newItem.price * newItem.quantity;
            state.items.push(newItem);
        },
        updateQuantity(state,action){
            const ItemId = action.payload.productId;
            const newQuantity = action.payload.updateQuantity;
            const price = state.items.find((item) => item.productId == ItemId).price;
            const oldQuantity = state.items.find((item) => item.productId == ItemId).quantity;
            state.items.find((item) => item.productId == ItemId).quantity = newQuantity;
            state.total -= oldQuantity*price
            state.total += newQuantity*price
        },
        removeItemFromCart(state,action){
            const itemId = action.payload;
            const price = state.items.find((item) => item.productId == itemId).price
            const quantity = state.items.find((item) => item.productId == itemId).quantity
            state.total -= price * quantity
            const filtered = state.items.filter((item) =>  item.productId !== itemId)
            state.items = filtered
        },
        replaceItemInCart(state,action) {
            const updatedItem = action.payload;
            const oldQuantity = state.items.find((item) => item.productId == updatedItem.productId).quantity;
            const price = state.items.find((item) => item.productId == updatedItem.productId).price;
            state.items.find((item) => item.productId == updatedItem.productId).quantity = updatedItem.quantity;
            const newQuantity = state.items.find((item) => item.productId == updatedItem.productId).quantity;
            state.total -= oldQuantity * price
            state.total += newQuantity * price
            state.items.find((item) => item.productId == updatedItem.productId).size = updatedItem.size;
        }
    },
});

export const cartActions = cartSlice.actions;
const store = configureStore({reducer:cartSlice.reducer});
export default store;