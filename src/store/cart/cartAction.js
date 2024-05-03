import { createAction } from "../../utils/reducer/reducerUtils";
import { CART_ACTION_TYPES } from "./cartTypes";

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

export const addItemToCart = (cartItems, productToAdd) => {
    const newItems = addCartItem(cartItems, productToAdd);
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newItems = removeCartItem(cartItems, cartItemToRemove);
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newItems = clearCartItem(cartItems, cartItemToClear);
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newItems);
}

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);