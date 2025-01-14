import Logo from "./logo";
import NavMenu from "./dropdownMenu";

/**
 * Creates page header
 * @returns {HTMLElement} page header element
 */
function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3 mt-md-4 mt-lg-5">
      <Logo />
      <NavMenu />
    </div>
  )
}

export default Header;

