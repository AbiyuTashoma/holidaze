import DatePicker from "react-datepicker";
import { useState } from "react";
import { addDays, subDays } from "date-fns";

function Calendar() {
  const [dateRange, setDateRange] = useState([new Date(), addDays(new Date(), 1)]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
      dateFormat='dd/MM/yyyy'
      selectsRange
      // showIcon
      onCalendarClose={() => console.log("closed")}
      // excludeDates={[addDays(new Date(), 1), {date: addDays(new Date(), 5), message: "booked"}]}
      excludeDateIntervals={[
        { start: addDays(new Date(), 6), end: addDays(new Date(), 7) }
      ]}
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
