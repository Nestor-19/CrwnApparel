import { createContext, useState } from "react";
import SHOP_PRODUCTS from '../shop_data.json'

export const ProductContext = createContext({
    products: []
})

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState(SHOP_PRODUCTS);
    const value = {products};

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}