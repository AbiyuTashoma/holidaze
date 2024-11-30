import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavMenu() {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <svg width="40px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </Dropdown.Toggle>
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