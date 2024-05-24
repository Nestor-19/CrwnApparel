import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/testUtils";
import CheckoutItem from "../CheckoutItem";

describe('Checkout Item tests', () => {
    test('Product must be removed when clear button is clicked', async () => {
        const testItem = {
            id: 1,
            name: 'testItem',
            imageUrl: 'testUrl',
            price: 15,
            quantity: 3
        }
        const {store} = renderWithProviders(<CheckoutItem checkoutItem={testItem}/>, {
            preloadedState: {
                cart: {
                    cartItems: [testItem]
                }
            }
        })

        const clearButton = screen.getByTestId('clear');
        await fireEvent.click(clearButton);
        expect(store.getState().cart.cartItems.length).toBe(0);
    })

    test('Quantity must increase when ❯ is clicked', async () => {
        const testItem = {
            id: 1,
            name: 'testItem',
            imageUrl: 'testUrl',
            price: 15,
            quantity: 3
        }

        const {store} = renderWithProviders(<CheckoutItem checkoutItem={testItem}/>, {
            preloadedState: {
                cart: {
                    cartItems: [testItem]
                }
            }
        })

        const increaseButton = screen.getByTestId('add');
        await fireEvent.click(increaseButton);
        await fireEvent.click(increaseButton);
        const quantity = store.getState().cart.cartItems[0].quantity;
        expect(quantity).toBe(5);
    })

    test('Quantity must decrease when ❮ is clicked', async () => {
        const testItem = {
            id: 1,
            name: 'testItem',
            imageUrl: 'testUrl',
            price: 15,
            quantity: 2
        }

        const {store} = renderWithProviders(<CheckoutItem checkoutItem={testItem}/>, {
            preloadedState: {
                cart: {
                    cartItems: [testItem]
                }
            }
        })

        const removeButton = screen.getByTestId('remove');
        await fireEvent.click(removeButton);
        const quantity = store.getState().cart.cartItems[0].quantity;
        expect(quantity).toBe(1);
    })
})