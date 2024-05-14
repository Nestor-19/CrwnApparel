import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe('Button Tests', () => {
    test('Should render default button when no text is passed', () => {
        render(<Button />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('undefined');
    })

    test('Should render google button when buttonType="google"', () => {
        render(<Button buttonType="google" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('google-sign-in');
    })

    test('Should render inverted button when buttonType="inverted"', () => {
        render(<Button buttonType="inverted" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('inverted');
    })

    test('Should disable button when isLoading=true', () => {
        render(<Button isLoading={true} />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    })
})
