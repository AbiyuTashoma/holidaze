import Logo from "./logo";
import NavMenu from "./dropdown-menu";

function Header() {
  return (
    <div className="d-flex align-items-start justify-content-between">
      <Logo />
      <NavMenu />
    </div>
  )
}

export default Header;