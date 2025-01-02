import { screen, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import VenuesList from ".";
import { accessToken, apiKey, managerName } from "../../../mockData/userData";
import { venuesResponse } from "../../../mockData/venuesResponse";
import { noImageUrl } from "../../../js/constants";

describe('VenuesList()', () => {
  test('it displays all venues', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route 
            path='/' 
            element={VenuesList(venuesResponse['data'], managerName, accessToken, apiKey, false)} />
        </Routes>
      </MemoryRouter>
    );

    const venues = venuesResponse['data'];
    const image = screen.getAllByRole('img');
    const imageLink = screen.getAllByTestId('imageLink');
    const venueName = screen.getAllByTestId('venueName');
    const venuePrice = screen.getAllByTestId('venuePrice');
    const viewButton = screen.getAllByTestId('viewButton');
    const editButton = screen.getAllByTestId('editButton');

    let imageIndex = 0;
    venues.map((venue) => {
      if (venue['media'].length) {  
        (venue['media'].map((img) => {
          expect(image[imageIndex]).toHaveAttribute('src', img['url']);
          imageIndex += 1;
        }))}
      else {
        expect(image[imageIndex]).toHaveAttribute('src', noImageUrl);
        imageIndex += 1;
      }
    });

    let linkIndex = 0;
    venues.map((venue) => {
      venue['media'].map(() =>{
        expect(imageLink[linkIndex]).toHaveAttribute('href', '/' + venue.id);
        linkIndex += 1;
      });
    });

    venueName.map((name, idx) => {
      expect(name).toHaveTextContent(venues[idx]['name'].trim());
    });

    venuePrice.map((price, idx) => {
      expect(price).toHaveTextContent(venues[idx]['price']);
    });

    viewButton.map((view, idx) =>{
      expect(view).toHaveAttribute('href', '/' + venues[idx].id);
    });

    const ownerManager = venues.filter((venue) => (venue['owner']['name'] === managerName));
    expect(editButton).toHaveLength(ownerManager.length);
  });
})