import { Dropdown } from "react-bootstrap";
import useUser from "../../../store/user";
import { shallow } from "zustand/shallow";

function NavMenu() {
  const { name, resetUser } = useUser(
    (state) => ({
      name: state.name,
      resetUser: state.resetUser,
    }),
    shallow
  );

  function logout() {
    resetUser();
  }

  return (
    <Dropdown className="position-relative me-2 me-md-3 me-xxl-5">
      <span className={name? "user d-block" : "d-none"}>{name? name.slice(0,2).toUpperCase(): null}</span>
      <Dropdown.Toggle id="dropdown-basic" className="btn-sm">
        <svg width="40px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18L20 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12L20 12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 6L20 6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">
        <Dropdown.Item href="/">Home</Dropdown.Item>
        <Dropdown.Item className={name? "d-none":"d-block"} href="/login">Login</Dropdown.Item>
        <Dropdown.Item className={name? "d-block":"d-none"} href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item className={name? "d-none":"d-block"} href="/register">Register</Dropdown.Item>
        <Dropdown.Item href="/contact">Contact us</Dropdown.Item>
        <Dropdown.Item href="/about">About us</Dropdown.Item>
        <Dropdown.Item className={name? "d-block":"d-none"} onClick={logout} href="/">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default NavMenu;