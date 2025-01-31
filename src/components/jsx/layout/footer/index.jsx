import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
import useUser from "../../store/user";

function Footer() {
  const { name } = useUser(
    (state) => ({
      name: state.name,
    }),
    shallow
  );

  return (
    <footer className="text-center py-3 mt-5">
      <div>&#169; Holidaze 2025</div>
      <ul className="footer-elements d-flex justify-content-between">
          <li><Link className="footer-link ms-1" to="/">Home</Link></li>
          <li className={name ? "d-none" : "footer-link d-block"}><Link className="footer-link" to="/login">Login</Link></li>
          <li className={name ? "d-none" : "footer-link d-block"}><Link className="footer-link" to="/register">Register</Link></li>
          <li><Link className="footer-link" to="/contact">Contact us</Link></li>
          <li><Link className="footer-link me-1" to="/about">About us</Link></li>
      </ul>
      <div className="d-flex justify-content-center">
        <p className="m-0">Follow us on:</p>
        <Image src={require("../../../resources/media/facebook.png")} className="social-media mx-1" alt="facebook"/>
        <Image src={require("../../../resources/media/tik-tok.png")} className="social-media mx-1" alt="tik-tok" fluid/>
        <Image src={require("../../../resources/media/snapchat.png")} className="social-media mx-1" alt="snapchat"/>
        <Image src={require("../../../resources/media/instagram.png")} className="social-media mx-1" alt="instagram"/>
      </div>
    </footer>
  );
}

export default Footer;