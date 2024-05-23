import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/testUtils";
import NavBar from "../navigation";

describe('Navigation tests', () => {
    test('Render Sign In link if currentUser does not exist', () => {
        renderWithProviders(<NavBar />, {
            preloadedState: {
                user: {
                    currentUser: null
                }
            }
        })

        const signInElement = screen.getByText(/sign in/i);
        expect(signInElement).toBeInTheDocument();
    })

    test('Render Sign Out link and not Sign In link if currentUser exists', () => {
        renderWithProviders(<NavBar />, {
            preloadedState: {
                user: {
                    currentUser: {}
                }
            }
        })

        const signOutElement = screen.getByText(/sign out/i);
        expect(signOutElement).toBeInTheDocument();
        
        const signInElement = screen.queryByText(/sign in/i);
        expect(signInElement).toBeNull();
    })
}) 