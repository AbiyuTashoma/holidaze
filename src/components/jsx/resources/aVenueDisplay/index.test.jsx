import { screen, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DisplayVenue from ".";
import { aVenueResponse } from "../../../mockData/aVenueResponse";
import { accessToken, apiKey, managerName } from "../../../mockData/userData";

describe('DisplayVenue()', () => {
    test('it displays a venue', () => {
        render(
            <MemoryRouter initialEntries={['/id']}>
                <Routes>
                    <Route 
                        path='/id' 
                        element={DisplayVenue(aVenueResponse, managerName, accessToken, apiKey)} />
                </Routes>
            </MemoryRouter>
        );

        const image = screen.getAllByRole('img');
        const venueName = screen.getByText('Vineyard');
        const description = screen.getByText('Historic vineyard');
        const price = screen.getByTestId('venuePrice');
        const maxGuests = screen.getByTestId('maxGuests');
        const bookButton = screen.getByTestId('bookBtn');

        expect(image[0]).toHaveAttribute('src', "https://cdn.pixabay.com/photo/2022/10/24/11/55/autumn-7543217_1280.jpg");
        expect(image[1]).toHaveAttribute('src', "https://cdn.pixabay.com/photo/2022/06/15/23/08/germany-7264701_1280.jpg");
        expect(venueName).toBeInTheDocument;
        expect(description).toBeInTheDocument;
        expect(price).toHaveTextContent('2990 NOK');
        expect(maxGuests).toHaveTextContent('8');
        expect(bookButton).toHaveAttribute('type', 'submit');
    });
})