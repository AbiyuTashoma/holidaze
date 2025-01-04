import { screen, render, fireEvent, act } from "@testing-library/react";
import CreateVenue from ".";

describe('CreateVenue()', () => {
    test('it displays create form', () => {
        render(<CreateVenue />);

        const name = screen.getByLabelText('Venue name');
        const description = screen.getByLabelText('Description');
        const url = screen.getByLabelText(/Image url/);
        const price = screen.getByLabelText('Price');
        const guests = screen.getByLabelText('Maximum number of guests');
        const rating = screen.getByLabelText('Rating');
        const breakfast = screen.getByTestId('breakfast');
        const wifi = screen.getByTestId('wifi');
        const parking = screen.getByTestId('parking');
        const pets = screen.getByTestId('pets');
        const createButton = screen.getByTestId('createButton');

        expect(name).toBeInTheDocument;
        expect(description).toBeInTheDocument;
        expect(url).toBeInTheDocument;
        expect(price).toBeInTheDocument;
        expect(guests).toBeInTheDocument;
        expect(rating).toBeInTheDocument;
        expect(breakfast).toBeInTheDocument;
        expect(wifi).toBeInTheDocument;
        expect(parking).toBeInTheDocument;
        expect(pets).toBeInTheDocument;

        fireEvent.change(name, {target: {value: 'name'}});
        fireEvent.change(description, {target: {value: 'description'}});
        fireEvent.change(url, {target: {value: 'https://www.abc.co'}});
        fireEvent.change(price, {target: {value: 3}});
        fireEvent.change(guests, {target: {value: 5}});
        fireEvent.change(rating, {target: {value: 4}});

        expect(name.value).toBe('name');
        expect(description.value).toBe('description');
        expect(url.value).toBe('https://www.abc.co');
        expect(price.value).toBe('3');
        expect(guests.value).toBe('5');
        expect(rating.value).toBe('4');
        expect(createButton).toHaveAttribute('type', 'submit');
    });
})