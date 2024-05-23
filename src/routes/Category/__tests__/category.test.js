import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/testUtils";
import Category from "../category";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        category: 'mens'
    })
}))

describe('Category test', () => {
    test('Render Spinner if isLoading is true', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    categoriesMap: {}
                }
            }
        })

        const spinnerElement = screen.getByTestId('spinner');
        expect(spinnerElement).toBeInTheDocument();
    })

    test('Render products in a category if isLoading is false', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categoriesMap: {
                        mens: [
                            {id: 1, imageUrl: 'testUrl1', name: 'testItem1', price: 25},
                            {id: 2, imageUrl: 'testUrl2', name: 'testItem2', price: 12}
                        ]
                    }
                }
            }
        })

        const spinnerElement = screen.queryByTestId('spinner');
        expect(spinnerElement).toBeNull();

        const testItem1Element = screen.getByText(/testItem1/i);
        expect(testItem1Element).toBeInTheDocument();
    })
})