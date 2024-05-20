import { screen } from "@testing-library/react";
import CartIcon from "../CartIcon";
import { renderWithProviders } from "../../../utils/test/testUtils";

describe('Cart Icon tests', () => {
    test('Use preloaded state to render', () => {
        const initialCartItems = [
            {id: 1, name: 'Test Item', imageUrl: 'test', price: 12, quantity: 3}
        ]

        renderWithProviders(<CartIcon />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: initialCartItems
                },
            },
        })

        const cartIconElement = screen.getByText('3');
        expect(cartIconElement).toBeInTheDocument();
    })
})
