import { Link } from "react-router-dom";

/**
 * Creates about us page elements
 * @returns {HTMLElement} about us page elements
 */
function AboutUs() {
  return(
    <div className="form-size" data-testid="about">
      <h1>About us</h1>
      <p>Holidaze Inc is an accommodation booking website. Holidaze website is developed with the customer at full focus. Our mission is to provide our customers a safe, secure and quality booking system.</p>
      <p>We strive to be better in every aspect of our business. If you have questions, comments or feedback, we encourage you to contact us via the <Link to="/contact">contact us</Link> form under the contact us page.</p>
      <p>Holidaze</p>
    </div>
  );
}

export default AboutUs;