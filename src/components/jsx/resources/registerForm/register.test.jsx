import { screen, render, fireEvent, act } from "@testing-library/react";
import RegisterForm from ".";

describe("RegisterForm()", () => {
  test("it displays register form and validates on submit", async () => {
    render(<RegisterForm />);

    const username = screen.getByLabelText("Username");
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("Password");
    const confirmPassword = screen.getByLabelText("Confirm password");
    const role = screen.getByLabelText("Select a role");
    const avatar = screen.getByLabelText("Avatar url (optional)");

    const usernameError = screen.getByTestId("usernameError");
    const emailError = screen.getByTestId("emailError");
    const passwordError = screen.getByTestId("passwordError");
    const confirmError = screen.getByTestId("confirmError");
    const roleError = screen.getByTestId("roleError");
    const avatarError = screen.getByTestId("avatarError");

    const registerButton = screen.getByRole("button");

    expect(registerButton).toHaveAttribute("type", "submit");

    await act(async () => {
      fireEvent.change(username, {target: {value: "na"}});
      fireEvent.change(email, {target: {value: "name@email.com"}});
      fireEvent.change(password, {target: {value: "short"}});
      fireEvent.change(role, {target: {value: null}});
      fireEvent.change(avatar, {target: {value: "www.abc.com"}})
    });      

    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(usernameError).toHaveTextContent("Username should be at least 3 characters.");
    expect(emailError).toHaveTextContent("Enter a proper email address.");
    expect(passwordError).toHaveTextContent("Password should be at least 8 characters.");
    expect(confirmError).toHaveTextContent("Passwords must match.");
    expect(roleError).toHaveTextContent("Select a role.");
    expect(avatarError).toHaveTextContent("Enter a valid url.");

    await act(async () => {
      fireEvent.change(username, {target: {value: "name"}});
      fireEvent.change(email, {target: {value: "name@stud.noroff.no"}});
      fireEvent.change(password, {target: {value: "long-enough"}});
      fireEvent.change(confirmPassword, {target: {value: "long-enough"}});
      fireEvent.change(role, {target: {value: true}});
      fireEvent.change(avatar, {target: {value: "https://www.abc.com"}})
    });      

    expect(usernameError).toHaveTextContent("");
    expect(emailError).toHaveTextContent("");
    expect(passwordError).toHaveTextContent("");
    expect(confirmError).toHaveTextContent("");
    expect(roleError).toHaveTextContent("");
    expect(avatarError).toHaveTextContent("");
  });
})