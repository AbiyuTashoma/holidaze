import Logo from "./logo";
import NavMenu from "./dropdownMenu";

function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center mx-2 mt-3 mt-sm-5">
      <Logo />
      <NavMenu />
    </div>
  )
}

export default Header;

