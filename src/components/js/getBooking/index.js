/**
 * Transforms bookings list in to a DatePicker usable format
 * @param {Array} bookingArray list of existing bookings
 * @returns {Array} formatted list of bookings
 */
function getBooking(bookingArray) {
  const arrayCopy = [...bookingArray];
  let booking = [];

  arrayCopy.map((item) =>
    booking.push({ start: item["dateFrom"], end: item["dateTo"], id: item.id })
  );

  return booking;
}

export default getBooking;
