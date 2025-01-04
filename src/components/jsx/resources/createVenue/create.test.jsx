import { screen, render, fireEvent, act } from "@testing-library/react";
import CreateVenue from ".";

describe('CreateVenue()', () => {
    test('it displays create form', async () => {
      await act( async () => {
        render(<CreateVenue />);
      });

      const name = screen.getByLabelText('Venue name');
      const description = screen.getByLabelText('Description');
      const media = screen.getByLabelText(/Image url/);
      const price = screen.getByLabelText('Price');
      const guests = screen.getByLabelText('Maximum number of guests');
      const rating = screen.getByLabelText('Rating');
      const breakfast = screen.getByTestId('breakfast');
      const wifi = screen.getByTestId('wifi');
      const parking = screen.getByTestId('parking');
      const pets = screen.getByTestId('pets');
      const createButton = screen.getByTestId('createButton');

      const nameError = screen.getByTestId('nameError');
      const descriptionError = screen.getByTestId('descriptionError');
      const mediaError = screen.getByTestId('mediaError');
      const priceError = screen.getByTestId('priceError');
      const guestsError = screen.getByTestId('guestsError');
      const ratingError = screen.getByTestId('ratingError');

      expect(name).toBeInTheDocument;
      expect(description).toBeInTheDocument;
      expect(media).toBeInTheDocument;
      expect(price).toBeInTheDocument;
      expect(guests).toBeInTheDocument;
      expect(rating).toBeInTheDocument;
      expect(breakfast).toBeInTheDocument;
      expect(wifi).toBeInTheDocument;
      expect(parking).toBeInTheDocument;
      expect(pets).toBeInTheDocument;
      expect(createButton).toHaveAttribute('type', 'submit');

      await act(async () => {
        fireEvent.change(name, {target: {value: 'na'}});
        fireEvent.change(description, {target: {value: 'desc'}});
        fireEvent.change(media, {target: {value: 'https://www'}});
        fireEvent.change(price, {target: {value: -1}});
        fireEvent.change(guests, {target: {value: 0}});
        fireEvent.change(rating, {target: {value: -5}});
      });      

      await act(async () => {
        fireEvent.click(createButton);
      });

      expect(nameError).toHaveTextContent('Name should be at least 3 characters.');
      expect(descriptionError).toHaveTextContent('Description should be at least 10 characters.');
      expect(mediaError).toHaveTextContent('Enter valid url separated by comma (,)');
      expect(priceError).toHaveTextContent('Enter valid venue price');
      expect(guestsError).toHaveTextContent('Enter the maximum number of guests');
      expect(ratingError).toHaveTextContent('Enter venue rating (0-5)');

      await act(async () => {
        fireEvent.change(name, {target: {value: 'name'}});
        fireEvent.change(description, {target: {value: 'venue description'}});
        fireEvent.change(media, {target: {value: 'https://www.holidaze.co'}});
        fireEvent.change(price, {target: {value: 2090}});
        fireEvent.change(guests, {target: {value: 5}});
        fireEvent.change(rating, {target: {value: 3}});
      });      

      expect(nameError).toHaveTextContent('');
      expect(descriptionError).toHaveTextContent('');
      expect(mediaError).toHaveTextContent('');
      expect(priceError).toHaveTextContent('');
      expect(guestsError).toHaveTextContent('');
      expect(ratingError).toHaveTextContent('');
    });
})