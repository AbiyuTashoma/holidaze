import DatePicker from "react-datepicker";
import { useState } from "react";
import { addDays } from "date-fns";
import getBooking from "../../../js/getBooking";

function Calendar({bookingsArray}) {
  const [dateRange, setDateRange] = useState([new Date(), addDays(new Date(), 3)]);
  const [startDate, endDate] = dateRange;

  const excludeDates = getBooking(bookingsArray);
  return (
    <div className="my-2">
      <label className="me-3 form-label" htmlFor="dates">Select dates</label>
      <DatePicker
        id="dates"
        showIcon
        dateFormat='dd/MM/yyyy'
        selectsRange
        onCalendarClose={() => console.log("closed")}
        excludeDateIntervals={excludeDates}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        maxDate={addDays(new Date(), 730)}
        onChange={(update) => {
          setDateRange(update);
        }}
        showDisabledMonthNavigation
      />
    </div>
  );
};

export default Calendar;
