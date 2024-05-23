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

    test('Do not render Spinner if isLoading is false', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    categoriesMap: {}
                }
            }
        })

        const spinnerElement = screen.queryByTestId('spinner');
        expect(spinnerElement).toBeNull();
    })
})