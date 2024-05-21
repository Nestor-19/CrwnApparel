import { screen } from "@testing-library/react";
import CartIcon from "../CartIcon";
import { renderWithProviders } from "../../../utils/test/testUtils";

describe('Cart Icon tests', () => {
    test('Use preloaded state to render', () => {
        const initialCartItems = [
            {id: 1, name: 'Test Item 1', imageUrl: 'image 1', price: 12, quantity: 3},
            {id: 2, name: 'Test Item 2', imageUrl: 'image 2', price: 15, quantity: 2},
        ]

        renderWithProviders(<CartIcon />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: initialCartItems
                },
            },
        })

        const cartIconElement = screen.getByText('5');
        expect(cartIconElement).toBeInTheDocument();
    })
})
