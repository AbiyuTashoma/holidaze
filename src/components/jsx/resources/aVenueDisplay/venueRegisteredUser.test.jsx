import { screen, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DisplayVenue from ".";
import { aVenueResponse } from "../../../mockData/aVenueResponse";
import { accessToken, apiKey, registeredName } from "../../../mockData/userData";

describe('DisplayVenue()', () => {
    test('it displays a venue', () => {
        render(
            <MemoryRouter initialEntries={['/id']}>
                <Routes>
                    <Route 
                        path='/id' 
                        element={DisplayVenue(aVenueResponse, registeredName, accessToken, apiKey)} />
                </Routes>
            </MemoryRouter>
        );

        const image = screen.getAllByRole('img');
        const editButton = screen.findAllByTestId('editBtn');
        const venueName = screen.getByText('Vineyard');
        const price = screen.getByTestId('venuePrice');
        const description = screen.getByText('Historic vineyard');
        const wifi = screen.getByText('No Wifi');
        const parking = screen.getByText('Parking');
        const breakfast = screen.getByText('Breakfast');
        const pets = screen.getByText('No Pets');
        const maxGuests = screen.getByTestId('maxGuests');
        const bookButton = screen.getByTestId('bookBtn');
        const bookings = screen.findAllByTestId('bookings');

        image.map((img, index) => 
            expect(img).toHaveAttribute('src', aVenueResponse['media'][index]['url'])
        );
        expect(editButton).toMatchObject({});
        expect(venueName).toBeInTheDocument;
        expect(price).toHaveTextContent(aVenueResponse['price']);
        expect(description).toBeInTheDocument;
        expect(wifi).toBeInTheDocument;
        expect(parking).toBeInTheDocument;
        expect(breakfast).toBeInTheDocument;
        expect(pets).toBeInTheDocument;
        expect(maxGuests).toHaveTextContent(aVenueResponse['maxGuests']);
        expect(bookButton).toHaveAttribute('type', 'submit');
        expect(bookings).toMatchObject({});
    });
})