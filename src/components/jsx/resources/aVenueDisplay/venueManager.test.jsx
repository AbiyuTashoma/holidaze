import { screen, render, act, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DisplayVenue from ".";
import { aVenueResponse } from "../../../resources/mockData/aVenueResponse";
import { accessToken, apiKey, managerName } from "../../../resources/mockData/userData";

describe("DisplayVenue()", () => {
  test("it displays a venue", async () => {
    await act(async() => {
      render(
        <MemoryRouter initialEntries={["/id"]}>
          <Routes>
            <Route 
              path="/id" 
              element={DisplayVenue(aVenueResponse, managerName, accessToken, apiKey)} />
          </Routes>
        </MemoryRouter>
      );
    });

    const unAvailableDate = "16/01/2025 - 31/01/2025";
    const availableDate = "03/02/2025 - 05/02/2025";
    const image = screen.getAllByRole("img");
    const editButton = screen.getByTestId("editButton");
    const venueName = screen.getByText("Vineyard");
    const price = screen.getByTestId("venuePrice");
    const description = screen.getByText("Historic vineyard");
    const wifi = screen.getByText("No Wifi");
    const parking = screen.getByText("Parking");
    const breakfast = screen.getByText("Breakfast");
    const pets = screen.getByText("No Pets");
    const maxGuests = screen.getByTestId("maxGuests");
    const bookButton = screen.getByTestId("bookButton");
    const bookings = screen.getAllByTestId("bookings");
    const guests = screen.getByLabelText("Number of guests");
    const date = screen.getByLabelText("Select dates");
    const priceSummary = screen.getByTestId("priceSummary");
    const dateError = screen.getByTestId("dateError");
    const guestsError = screen.getByTestId("guestsError");

    image.map((img, index) => 
      expect(img).toHaveAttribute("src", aVenueResponse["media"][index]["url"])
    );
    expect(editButton).toBeEnabled;
    expect(venueName).toBeInTheDocument;
    expect(price).toHaveTextContent(aVenueResponse["price"]);
    expect(description).toBeInTheDocument;
    expect(wifi).toBeInTheDocument;
    expect(parking).toBeInTheDocument;
    expect(breakfast).toBeInTheDocument;
    expect(pets).toBeInTheDocument;
    expect(maxGuests).toHaveTextContent(aVenueResponse["maxGuests"]);
    expect(guests).toHaveDisplayValue(aVenueResponse["maxGuests"]);
    expect(bookButton).toHaveAttribute("type", "submit");
    expect(bookings).toHaveLength(aVenueResponse["bookings"].length);
    bookings.map((book, index) => {
      expect(book).toHaveTextContent(aVenueResponse["bookings"][index]["customer"]["name"]);
      expect(book).toHaveTextContent((new Date(aVenueResponse["bookings"][index]["dateFrom"])).toDateString());
      expect(book).toHaveTextContent((new Date(aVenueResponse["bookings"][index]["dateTo"])).toDateString());
      expect(book).toHaveTextContent(aVenueResponse["bookings"][index]["guests"]);
    });

    await act(async() => {
      fireEvent.change(guests, {target: {value: `${aVenueResponse["maxGuests"] + 10}`}});
      fireEvent.click(guests);
      fireEvent.change(date, {target: {value: unAvailableDate}});
      fireEvent.blur(date);
    });
    expect(dateError).toHaveTextContent("Dates are booked, choose other dates.");
    expect(guestsError).toHaveTextContent("Maximum number of guests is " + aVenueResponse["maxGuests"]);
    expect(priceSummary).toHaveTextContent("");
    expect(bookButton).toHaveAttribute("disabled");

    await act(async() => {
      fireEvent.change(guests, {target: {value: `${aVenueResponse["maxGuests"]}`}});
      fireEvent.click(guests);
      fireEvent.change(date, {target: {value: availableDate}});
      fireEvent.blur(date);
    });
    expect(dateError).toHaveTextContent("");
    expect(guestsError).toHaveTextContent("");
    expect(priceSummary).toHaveTextContent("5980 NOK for 2 days ✓");
    expect(bookButton).not.toHaveAttribute("disabled");
  });
})