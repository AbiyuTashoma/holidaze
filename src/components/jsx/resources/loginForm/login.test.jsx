import { screen, render, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LoginForm from ".";

describe("LoginForm()", () => {
  test("it displays login form and validates on submit", async () => {
    await act( async () => {
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route 
              path="/login" 
              element={<LoginForm />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const emailError = screen.getByTestId("emailError");
    const passwordError = screen.getByTestId("passwordError");
    const loginButton = screen.getByTestId("loginButton");
    const registerLink = screen.getByTestId("registerLink");

    expect(loginButton).toHaveAttribute("type", "submit");
    expect(registerLink).toHaveAttribute("href", "/register");

    await act(async () => {
      fireEvent.change(email, {target: {value: "name@email.com"}});
      fireEvent.change(password, {target: {value: "short"}});
    });      

    await act(async () => {
      fireEvent.click(loginButton);
    });

    expect(emailError).toHaveTextContent("Enter a proper email address.");
    expect(passwordError).toHaveTextContent("Password should be at least 8 characters.");

    await act(async () => {
      fireEvent.change(email, {target: {value: "name@stud.noroff.no"}});
      fireEvent.change(password, {target: {value: "long-enough"}});
    }); 

    expect(emailError).toHaveTextContent("");
    expect(passwordError).toHaveTextContent("");
  });
})