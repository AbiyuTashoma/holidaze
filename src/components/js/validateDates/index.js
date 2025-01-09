import { differenceInCalendarDays } from "date-fns";

/**
 * Validates whether the selected dates are valid or not *
 * @param {Date} sDate start date
 * @param {Date} eDate end date
 * @param {Array} exDates array of occupied dates
 * @returns {[Boolean, String]} [validity of start and end date, error message]
 */
function validateDates(sDate, eDate, exDates) {
  const days = differenceInCalendarDays(eDate, sDate);

  if (!Boolean(sDate) || !Boolean(eDate) || days < 1) {
    return [true, "Select valid dates"];
  } else {
    let invalidDate = false;
    exDates.map(
      (item) =>
        (invalidDate ||=
          new Date(item["end"]) < new Date(eDate) &&
          new Date(item["start"]) > new Date(sDate))
    );

    return [invalidDate, "Dates are booked, choose other dates."];
  }
}

export default validateDates;
