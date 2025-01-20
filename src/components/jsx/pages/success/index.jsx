import SuccessInfo from "../../resources/successInfo";
import SuggestVenues from "../../resources/suggestVenues";

/**
 * Displays the booking success page
 * @returns {HTMLElement} booking success page
 */
function Success() {
  return (
    <div className="m-auto success-width">
      <SuccessInfo />
      <div className="mx-3 my-3">You may also be interested in:</div>
      <SuggestVenues />
    </div>
  );
}

export default Success;