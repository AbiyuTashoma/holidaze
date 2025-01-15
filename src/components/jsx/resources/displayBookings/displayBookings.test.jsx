import { screen, render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DisplayBookings from ".";
import { bookingsResponse } from "../../../resources/mockData/bookingsResponse";
import { accessToken, apiKey } from "../../../resources/mockData/userData";

describe("DisplayBookings()", () => {
  test("it displays profile bookings", () => {
    render(
      <MemoryRouter initialEntries={["/bookings"]}>
        <Routes>
          <Route 
            path="/bookings" 
            element={DisplayBookings(bookingsResponse, accessToken, apiKey)} />
        </Routes>
      </MemoryRouter>
    );

    const image = screen.getAllByRole("img");
    const imageLink = screen.getAllByTestId("imageLink");
    const venueName = screen.getAllByTestId("venueName");
    const dateIn = screen.getAllByTestId("dateIn");
    const dateOut = screen.getAllByTestId("dateOut");
    const guests = screen.getAllByTestId("guests");
    const viewButton = screen.getAllByTestId("viewButton");
    const manageButton = screen.getAllByTestId("manageButton");

    let imageIndex = 0;
    bookingsResponse.map((booking) => {
      if (booking["venue"]["media"].length) {  
        (booking["venue"]["media"].map((img) => {
          expect(image[imageIndex]).toHaveAttribute("src", img["url"]);
          imageIndex += 1;
        }))}
      else {
        expect(image[imageIndex]).toHaveAttribute("src", noImageUrl);
        imageIndex += 1;
      }
    });

    let linkIndex = 0;
    bookingsResponse.map((booking) => {
      booking["venue"]["media"].map(() =>{
        expect(imageLink[linkIndex]).toHaveAttribute("href", "/" + booking["venue"].id);
        linkIndex += 1;
      });
    });

    venueName.map((name, idx) => {
      expect(name).toHaveTextContent(bookingsResponse[idx]["venue"]["name"].trim());
    });

    dateIn.map((date, idx) => {
      expect(date).toHaveTextContent((new Date(bookingsResponse[idx]["dateFrom"])).toDateString());
    });

    dateOut.map((date, idx) => {
      expect(date).toHaveTextContent((new Date(bookingsResponse[idx]["dateTo"])).toDateString());
    });

    guests.map((guest, idx) => {
      expect(guest).toHaveTextContent(`Guests: ${bookingsResponse[idx]["guests"]}`);
    });
    
    viewButton.map((view, idx) =>{
      expect(view).toHaveAttribute("href", "/" + bookingsResponse[idx]["venue"].id);
      expect(view).toHaveTextContent("View venue");
    });

    manageButton.map((manage) =>{
      expect(manage).toHaveTextContent("Manage booking");
    });
  });
})