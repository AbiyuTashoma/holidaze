import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * Creates a carousel of images
 * @param {Array} media array of media
 * @returns {HTMLElement}
 */
function ImageCarousel(media, id = "", imageLink = false) {
  return media.length ? (
    <Carousel slide={false}>
      {media.map((item, index) => 
      <Carousel.Item key={item['url'] + index}>
        {
          imageLink ?
            <Link to={'/' + id}>
              <img src= {item['url']} className="list-image" alt={item['alt']}/>
            </Link>:     
          <img src= {item['url']} className="list-image" alt={item['alt']}/>
        }
      </Carousel.Item>
      )}
    </Carousel>
  ) : (<img src="https://st4.depositphotos.com/17828278/24401/v/600/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" className="list-image" alt="Not available"/>);
}

export default ImageCarousel;