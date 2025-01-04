import { screen, render, fireEvent, act } from "@testing-library/react";
import EditVenue from ".";
import { aVenueResponse } from "../../../mockData/aVenueResponse";
import { accessToken, apiKey } from "../../../mockData/userData";
import createString from "../../../js/createString";

describe("EditVenue()", () => {
    test("it displays update venue form and validates on submit", async () => {
      await act( async () => {
        render(<EditVenue venue={aVenueResponse} accessToken={accessToken} apiKey={apiKey} />);
      });

      const editButton = screen.getByTestId("editButton");

      await act(async () => {
        fireEvent.click(editButton);
      });

      const name = screen.getByLabelText("Venue name");
      const description = screen.getByLabelText("Description");
      const media = screen.getByLabelText(/Image url/);
      const price = screen.getByLabelText("Price");
      const guests = screen.getByLabelText("Maximum number of guests");
      const rating = screen.getByLabelText("Rating");
      const saveButton = screen.getByTestId("saveButton");

      const nameError = screen.getByTestId("nameError");
      const descriptionError = screen.getByTestId("descriptionError");
      const mediaError = screen.getByTestId("mediaError");
      const priceError = screen.getByTestId("priceError");
      const guestsError = screen.getByTestId("guestsError");
      const ratingError = screen.getByTestId("ratingError");

      expect(name).toHaveDisplayValue(aVenueResponse["name"]);
      expect(description).toHaveDisplayValue(aVenueResponse["description"]);
      expect(media).toHaveDisplayValue(createString(aVenueResponse["media"]));
      expect(price).toHaveDisplayValue(aVenueResponse["price"]);
      expect(guests).toHaveDisplayValue(aVenueResponse["maxGuests"]);
      expect(rating).toHaveDisplayValue(aVenueResponse["rating"]);
      expect(saveButton).toBeInTheDocument;

      await act(async () => {
        fireEvent.change(name, {target: {value: "na"}});
        fireEvent.change(description, {target: {value: "desc"}});
        fireEvent.change(media, {target: {value: "https://www"}});
        fireEvent.change(price, {target: {value: -1}});
        fireEvent.change(guests, {target: {value: 0}});
        fireEvent.change(rating, {target: {value: -5}});
      });      

      await act(async () => {
        fireEvent.click(saveButton);
      });

      expect(nameError).toHaveTextContent("Name should be at least 3 characters.");
      expect(descriptionError).toHaveTextContent("Description should be at least 10 characters.");
      expect(mediaError).toHaveTextContent("Enter valid url separated by comma (,)");
      expect(priceError).toHaveTextContent("Enter valid venue price");
      expect(guestsError).toHaveTextContent("Enter the maximum number of guests");
      expect(ratingError).toHaveTextContent("Enter venue rating (0-5)");

      await act(async () => {
        fireEvent.change(name, {target: {value: "name"}});
        fireEvent.change(description, {target: {value: "venue description"}});
        fireEvent.change(media, {target: {value: "https://www.holidaze.co"}});
        fireEvent.change(price, {target: {value: 2090}});
        fireEvent.change(guests, {target: {value: 5}});
        fireEvent.change(rating, {target: {value: 3}});
      });      

      expect(nameError).toHaveTextContent("");
      expect(descriptionError).toHaveTextContent("");
      expect(mediaError).toHaveTextContent("");
      expect(priceError).toHaveTextContent("");
      expect(guestsError).toHaveTextContent("");
      expect(ratingError).toHaveTextContent("");
    });
})