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
        const editButton = screen.getByTestId('editButton');
        const venueName = screen.getByText('Vineyard');
        const price = screen.getByTestId('venuePrice');
        const description = screen.getByText('Historic vineyard');
        const wifi = screen.getByText('No Wifi');
        const parking = screen.getByText('Parking');
        const breakfast = screen.getByText('Breakfast');
        const pets = screen.getByText('No Pets');
        const maxGuests = screen.getByTestId('maxGuests');
        const bookButton = screen.getByTestId('bookButton');
        const bookings = screen.getAllByTestId('bookings');

        image.map((img, index) => 
            expect(img).toHaveAttribute('src', aVenueResponse['media'][index]['url'])
        );
        expect(editButton).toBeEnabled;
        expect(venueName).toBeInTheDocument;
        expect(price).toHaveTextContent(aVenueResponse['price']);
        expect(description).toBeInTheDocument;
        expect(wifi).toBeInTheDocument;
        expect(parking).toBeInTheDocument;
        expect(breakfast).toBeInTheDocument;
        expect(pets).toBeInTheDocument;
        expect(maxGuests).toHaveTextContent(aVenueResponse['maxGuests']);
        expect(bookButton).toHaveAttribute('type', 'submit');
        expect(bookings).toHaveLength(aVenueResponse['bookings'].length);
        bookings.map((book, index) => {
            expect(book).toHaveTextContent(aVenueResponse['bookings'][index]['customer']['name']);
            expect(book).toHaveTextContent((new Date(aVenueResponse['bookings'][index]['dateFrom'])).toDateString());
            expect(book).toHaveTextContent((new Date(aVenueResponse['bookings'][index]['dateTo'])).toDateString());
            expect(book).toHaveTextContent(aVenueResponse['bookings'][index]['guests']);
        });
    });
})