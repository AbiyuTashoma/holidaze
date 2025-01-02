import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { noImageUrl } from "../../../js/constants";

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
            <Link to={'/' + id} data-testid="imageLink">
              <img src= {item['url']} className="list-image" alt={item['alt']}/>
            </Link>:     
            <img src= {item['url']} className="list-image" alt={item['alt']}/>
        }
      </Carousel.Item>
      )}
    </Carousel>
  ) : 
  (
    <>
    {
    imageLink ? 
      <Link to={'/' + id}>
        <img src={noImageUrl} className="list-image" alt="Not available"/>
      </Link>:   
      <img src={noImageUrl} className="list-image" alt="Not available"/>
    }
    </>
  );
}

export default ImageCarousel;