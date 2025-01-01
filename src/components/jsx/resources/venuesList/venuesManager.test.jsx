import { screen, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import VenuesList from ".";
import { accessToken, apiKey, managerName } from "../../../mockData/userData";
import { venuesResponse } from "../../../mockData/venuesResponse";

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

    let index = 0;
    venues.map((venue) => {
      if (venue['media'].length) {
        venue['media'].map((img) => {
        expect(image[index]).toHaveAttribute('src', img['url']);
        index += 1;
      });
      } else {
        index += 1;
      }      
    });
    
  });
})