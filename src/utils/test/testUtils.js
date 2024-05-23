import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "../../store/rootReducer";
import { BrowserRouter } from "react-router-dom";

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        store = configureStore({reducer: rootReducer, preloadedState}),
        ...renderOptions
    } = {}
) {
    const Wrapper = ({children}) => {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </Provider>
        ) 
    }

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}