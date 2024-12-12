function getBooking(bookingArray) {
  let arrayCopy = [...bookingArray];
  let bKing = [];

  arrayCopy.map((item) =>
    bKing.push({ start: item["dateFrom"], end: item["dateTo"] })
  );

  console.log(bKing);
  return bKing;
}

export default getBooking;
