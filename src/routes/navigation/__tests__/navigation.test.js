import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/testUtils";
import NavBar from "../navigation";
import * as firebase from "../../../utils/firebase/firebase";

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

    test('Render Cart DropDown if isCartOpen is true', () => {
        renderWithProviders(<NavBar />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                    
                }
            }
        })

        const emptyCartTextElement = screen.getByText(/your cart is empty/i);
        expect(emptyCartTextElement).toBeInTheDocument();
    })

    test('Do not Render Cart DropDown if isCartOpen is false', () => {
        const initialCartItems = [
            {id: 1, name: 'Test Item 1', imageUrl: 'image 1', price: 12, quantity: 3}
        ]
        renderWithProviders(<NavBar />, {
            preloadedState: {
                cart: {
                    isCartOpen: false,
                    cartItems: initialCartItems
                    
                }
            }
        })
        const checkoutButtonElement = screen.queryByText(/go to checkout/i);
        expect(checkoutButtonElement).toBeNull();
    })

    test('Trigger SignOutUser when SignOut link is clicked', async () => {
        const signOutUserSpy = jest.spyOn(firebase, 'signOutUser').mockResolvedValue();

        renderWithProviders(<NavBar />, {
          preloadedState: {
            user: {
              currentUser: {},
            },
          },
        });
    
        expect(screen.getByText('SIGN OUT')).toBeInTheDocument();
    
        await fireEvent.click(screen.getByText('SIGN OUT'));
        
        expect(signOutUserSpy).toHaveBeenCalled();

        signOutUserSpy.mockClear();
    });
}) 