function getBooking(bookingArray) {
  const arrayCopy = [...bookingArray];
  let booking = [];

  arrayCopy.map((item) =>
    booking.push({ start: item["dateFrom"], end: item["dateTo"] })
  );

  return booking;
}

export default getBooking;
