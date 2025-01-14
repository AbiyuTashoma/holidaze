import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

/**
 * Creates page layout
 * @returns {HTMLElement} Page layout element
 */
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
export default Layout;