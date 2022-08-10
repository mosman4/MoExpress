import {configureStore, createSlice} from  "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        cartItems:[],
        total:0
    },
    reducers:{
        addProduct(state,action){
            const product = action.payload;
            state.products.push(...product)
        },
        addItemToCart(state,action){
            const newItem = action.payload;
            state.total += newItem.price * newItem.quantity;
            state.cartItems.push(newItem);
        },
        updateQuantity(state,action){
            const ItemId = action.payload.productId;
            const newQuantity = action.payload.updateQuantity;
            const price = state.cartItems.find((item) => item.productId == ItemId).price;
            const oldQuantity = state.cartItems.find((item) => item.productId == ItemId).quantity;
            state.cartItems.find((item) => item.productId == ItemId).quantity = newQuantity;
            state.total -= oldQuantity*price
            state.total += newQuantity*price
        },
        removeItemFromCart(state,action){
            const itemId = action.payload;
            const price = state.cartItems.find((item) => item.productId == itemId).price
            const quantity = state.cartItems.find((item) => item.productId == itemId).quantity
            state.total -= price * quantity
            const filtered = state.cartItems.filter((item) =>  item.productId !== itemId)
            state.cartItems = filtered
        },
        replaceItemInCart(state,action) {
            const updatedItem = action.payload;
            const oldQuantity = state.cartItems.find((item) => item.productId == updatedItem.productId).quantity;
            const price = state.cartItems.find((item) => item.productId == updatedItem.productId).price;
            state.cartItems.find((item) => item.productId == updatedItem.productId).quantity = updatedItem.quantity;
            const newQuantity = state.cartItems.find((item) => item.productId == updatedItem.productId).quantity;
            state.total -= oldQuantity * price
            state.total += newQuantity * price
            state.cartItems.find((item) => item.productId == updatedItem.productId).size = updatedItem.size;
        }
    },
});

export const cartActions = cartSlice.actions;
const store = configureStore({reducer:cartSlice.reducer});
export default store;