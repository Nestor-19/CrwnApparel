import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/testUtils";
import ProductCard from "../ProductCard";

describe('Product Card tests', () => {
    test('Product must be added to cart when AddToCart button is clicked', async () => {
        const testProduct = {
            id: 1,
            imageUrl: 'testUrl',
            name: 'testProduct',
            price: 15
        }
        
        const {store} = renderWithProviders(<ProductCard product={testProduct}/>, {
            preloadedState: {
                cart: {
                    cartItems: []
                }
            }
        })

        const addToCartButton = screen.getByText(/add to cart/i);
        await fireEvent.click(addToCartButton);
        expect(store.getState().cart.cartItems.length).toBe(1);
    })
})
