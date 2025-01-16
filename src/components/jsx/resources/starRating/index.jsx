/**
 * Creates a venue rating in star format
 * @param {Number} rating venue rating value
 * @returns {HTMLElement} a venue rating in a star format
 */
function StarRating (rating) {
  switch(rating) {
    case 0:
      return (
        <div className="rating">
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>
      );
    case 1:
      return (
        <div className="rating">
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>
      );
    case 2:
      return (
        <div className="rating">
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>
      );
    case 3:
      return (
        <div className="rating">
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>
      );
    case 4:
      return (
        <div className="rating">
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star"></span>
        </div>
      );
    case 5:
      return (
        <div className="rating">
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
          <span className="fa fa-star review-checked"></span>
        </div>
      );
    default:
      return (
        <div className="rating">
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>
      );
  }
}

export default StarRating;