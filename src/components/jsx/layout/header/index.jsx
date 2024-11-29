import Logo from "./logo";
import NavMenu from "./dropdownMenu";

function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <Logo />
      <NavMenu />
    </div>
  )
}

export default Header;

