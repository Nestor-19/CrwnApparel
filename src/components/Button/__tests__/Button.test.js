import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe('Button Tests', () => {
    test('Should render default button when no text is passed', () => {
        render(<Button></Button>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('undefined');
    })
})
