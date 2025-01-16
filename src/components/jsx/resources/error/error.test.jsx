import { screen, render } from "@testing-library/react";
import Error from ".";

describe("Error()", () => {
  test("it returns error", () => {
    render(<Error />);

    const error = screen.getByText("Error loading");
    expect(error).toBeInTheDocument;
    expect(error).toHaveAttribute("class", "text-center text-danger my-5");
  });
})