import { differenceInCalendarDays } from "date-fns";
import { currency } from "../../../js/constants";

/**
 * Validates and calculates price summary of the given dates
 * @param {Date} startDate start date of the booking
 * @param {Date} endDate end date of the booking
 * @param {Boolean} invalid validity of the booking
 * @param {Number} price price per day of the venue
 * @returns {HTMLElement} price summary of selected dates
 */
function Price(startDate, endDate, invalid, price) {
  const days = differenceInCalendarDays(endDate, startDate);

  return Boolean(startDate) && Boolean(endDate) && !invalid ? (
    <div className="my-2">
      {days * price} {currency} for {days} days <span className="available">&#10003;</span>
    </div>
  ) : (
    <div></div>
  );
}

export default Price;
