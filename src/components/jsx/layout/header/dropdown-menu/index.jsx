import { Dropdown } from 'react-bootstrap';

function NavMenu() {
  return (
    <Dropdown menuVariant="dark">
      <Dropdown.Toggle id="dropdown-basic">Menu</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/">Home</Dropdown.Item>
        <Dropdown.Item href="/login">Login</Dropdown.Item>
        <Dropdown.Item href="/register">Register</Dropdown.Item>
        <Dropdown.Item href="/contact">Contact us</Dropdown.Item>
        <Dropdown.Item href="/about">About us</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default NavMenu;