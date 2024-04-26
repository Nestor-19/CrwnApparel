import { createContext, useReducer} from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => (cartItem.id === productToAdd.id)
    );
    
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => (cartItem.id === cartItemToRemove.id)
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }

    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id 
                ? {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        )
    } 
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const CartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type: ${type} in CartReducer`)
    }
}

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
    const {isCartOpen, cartItems, cartCount, cartTotal} = state;
    
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => (total + cartItem.quantity), 0)
        const newCartTotal = newCartItems.reduce((cartTotal, cartItem) => (cartTotal + (cartItem.quantity * cartItem.price)), 0)

        dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, 
            payload: {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
            }})
    }


    const addItemToCart = (productToAdd) => {
        updateCartItemsReducer(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        updateCartItemsReducer(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        updateCartItemsReducer(clearCartItem(cartItems, cartItemToClear));
    }

    const setIsCartOpen = (updatedIsCartOpen) => {
        dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: updatedIsCartOpen})
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal};
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 
