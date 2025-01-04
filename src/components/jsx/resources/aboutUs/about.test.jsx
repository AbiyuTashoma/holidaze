import { MemoryRouter, Route, Routes } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import AboutUs from ".";

describe("AboutUs()", () => {
  test("it displays information and link", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <Routes>
          <Route 
            path="/about" 
            element={<AboutUs />} />
        </Routes>
      </MemoryRouter>
    );

    const about = screen.getByTestId("about");
    const contactLink = screen.getByRole("link");

    expect(about).toHaveTextContent("Holidaze Inc is an accommodation booking website. Holidaze website is developed with the customer at full focus. Our mission is to provide our customers a safe, secure and quality booking system.");
    expect(contactLink).toHaveAttribute("href", "/contact");
    expect(contactLink).toHaveTextContent("contact us");
  });
})