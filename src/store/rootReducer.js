import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer";
import { categoriesReducer } from "./categories/categoriesReducer";
import { CartReducer } from "./cart/cartReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: CartReducer
})