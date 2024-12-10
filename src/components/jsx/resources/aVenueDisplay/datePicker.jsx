import DatePicker from "react-datepicker";
import { useState } from "react";
import { addDays, subDays } from "date-fns";

// const bookingArray = [{ id: "73beeeee-eb10-4c21-a850-5e1436a8ec9c", dateFrom: "2024-12-08T23:00:00.000Z", dateTo: "2024-12-10T23:00:00.000Z" },
//   { id: "57c8f59b-5d35-4cfc-a83f-ea4bc4ed15d5", dateFrom: "2025-02-13T22:00:00.000Z", dateTo: "2025-02-22T21:59:59.999Z" },
//   { id: "1f67857c-494a-4ec0-a514-3500ccf1464d", dateFrom: "2024-12-08T23:00:00.000Z", dateTo: "2024-12-18T23:00:00.000Z" },
//   { id: "5652db32-34e6-4902-b17b-3c498fa76000", dateFrom: "2024-12-24T16:21:35.029Z", dateTo: "2024-12-26T16:21:35.029Z" }];

const bookingEmpty = [];


// function getBooking(bkng) {
//   let booking = [];
//   bkng.map((item) => (booking.push({start: item["dateFrom"], end: item["dateTo"]})));
//   console.log(booking);
//   // return booking;
// }

function Calendar(int) {
  const [dateRange, setDateRange] = useState([new Date(), addDays(new Date(), 7)]);
  const [startDate, endDate] = dateRange;

  const excludes = [
        { start: addDays(new Date(), 6), end: addDays(new Date(), 7) },
        { start: addDays(new Date(), 9), end: addDays(new Date(), 15) }
      ];
  return (
    <DatePicker
      dateFormat='dd/MM/yyyy'
      selectsRange
      // showIcon
      onCalendarClose={() => console.log("closed")}
      // excludeDates={[addDays(new Date(), 1), {date: addDays(new Date(), 5), message: "booked"}]}
      excludeDateIntervals={int}
      // highlightDates={[subDays(new Date(), 7), addDays(new Date(), 7)]}
      // shouldCloseOnSelect={false}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      maxDate={addDays(new Date(), 730)}
      onChange={(update) => {
        setDateRange(update);
      }}
      // selectsDisabledDaysInRange={false}
      showDisabledMonthNavigation
      // isClearable={true}
      // inline
    />
  );
};

export default Calendar;
