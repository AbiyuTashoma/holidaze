import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavMenu() {
  return (
    <Dropdown menuVariant="dark">
      <Dropdown.Toggle id="dropdown-basic">Menu</Dropdown.Toggle>
      <Dropdown.Menu align="end">
        <Dropdown.Item className='p-0'><Link className='dropdown-item' to="/">Home</Link></Dropdown.Item>
        <Dropdown.Item className='p-0'><Link className='dropdown-item' to="/login">Login</Link></Dropdown.Item>
        <Dropdown.Item className='p-0'><Link className='dropdown-item' to="/register">Register</Link></Dropdown.Item>
        <Dropdown.Item className='p-0'><Link className='dropdown-item' to="/contact">Contact us</Link></Dropdown.Item>
        <Dropdown.Item className='p-0'><Link className='dropdown-item' to="/about">About us</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default NavMenu;