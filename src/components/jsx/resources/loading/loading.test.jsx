import { screen, render } from "@testing-library/react";
import Loading from ".";

describe('Loading()', () => {
    test('it returns loading', () => {
        render(<Loading />);

        const loading = screen.getByTestId('loading-spinner');
        expect(loading).toBeInTheDocument;
    });
})