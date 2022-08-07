import { createContext, useState } from "react";


export const StoreContext = createContext({
    cartItems:{},
    addToCart:()=> {},
})

export default function StoreContextProvider ({children}){

    const [items,setItems] = useState({})

    function addToCartHandler (item) {
        setItems(item)
        console.log(item)
    }

    const values = {
        cartItems:items,
        addToCart:addToCartHandler
    }

    return(
        <StoreContext.Provider value={values}>
            {children}
        </StoreContext.Provider>
    )


}