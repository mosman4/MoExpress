import {configureStore, createSlice} from  "@reduxjs/toolkit"

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        favorites:[],
        cartItems:[],
        orders:[],
        userInfo:{},
        total:0
    },
    reducers:{
        addProduct(state,action){
            const product = action.payload;
            state.products.push(...product)
        },
        removeProducts(state){
            state.products = []
        },
        pushItemsToCart(state,action){
            const items = action.payload;
            if(items.length > 0){
                state.total += items.map((item) => item.totalPrice).reduce((initial,final) => initial + final)
                state.cartItems.push(...items)
            }
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
        resetCart(state){
            state.cartItems = [],
            state.total= 0
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
        },
        addFavorites(state,action){
            const items = action.payload;
            state.favorites.push(...items)
        },
        addToFavorite(state,action) {
            const productId = action.payload;
            state.favorites.push(productId)
        },
        removeFromFavorite(state,action){
            const itemId = action.payload;
            const filtered = state.favorites.filter((item) =>  item.productId !== itemId.productId)
            state.favorites = filtered
        },
        resetFavorites(state){
            state.favorites=[]
        },
        addOrders(state,action){
            const products = action.payload;
            state.orders.push(...products)
        },
        addNewOrder(state,action){
            const item = action.payload;
            const product = {id:item.id,orderItems:item.itemsInCart,orderDate:item.createdAt}
            state.orders.push(product)
        },
        
        resetOrders(state){
            state.orders=[]
        },
        addUserInfo(state,action){
            const item = action.payload;
            state.userInfo = item;
        },
        addAddress(state,action){
            const item = action.payload;
            state.userInfo.address = item
        },
        resetUserInfo(state,action){
            state.userInfo = {};
        },
    },
});

export const cartActions = cartSlice.actions;
const store = configureStore({reducer:cartSlice.reducer});
export default store;