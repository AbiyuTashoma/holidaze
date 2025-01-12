import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../../js/bookingValidation";
import { Button, Row } from "react-bootstrap";
import reRoute from "../../../js/reRoute/reRoute";
import { useState } from "react";
import { bookingsUrl, timeout } from "../../../js/constants";
import api from "../../../js/api";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import getBooking from "../../../js/getBooking";
import enableDisable from "../../../js/enableDisable";
import validateDates from "../../../js/validateDates";
import Price from "../price";

function BookForm({venue, accessToken, apiKey}) {
  const [apiData, setApiData] = useState([null, null]);
  const [message, type] = apiData;
  const [dateStatus, setDateStatus] = useState([true, ""]);
  const [invalid, feedback] = dateStatus;
  const [dateRange, setDateRange] = useState([new Date(), addDays(new Date(), 3)]);
  const [startDate, endDate] = dateRange;

  const excludeDates = getBooking(venue["bookings"]);

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(venue["maxGuests"])),
  });

  async function OnSubmit(data, event) {
    const bookData = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: data.guests,
      venueId: venue.id,
    };

    const bookOption = {
      method: "POST",
      body: JSON.stringify(bookData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    const resp = await api(bookingsUrl, bookOption);

    if (resp["data"]) {
      setApiData(["Venue successfully booked", "text-success"]);
      event.target.reset();
      setTimeout(reRoute("/success"), timeout);
      return;
    }
    else {
      resp["errors"][0]["message"] ? 
        setApiData([resp["errors"][0]["message"], "text-danger"]) :
        setApiData(["Unknown error occurred", "text-danger"]);
      return;
    }    
  }

  return(
    <form onSubmit={handleSubmit(OnSubmit)}>
      <div className="fw-semibold my-2">Check availability</div>
      <div className="d-flex gap-3 align-items-top">
        <label htmlFor="guests" className="form-label mt-1">Number of guests</label>
        <div>
          <input 
            type="number" 
            className="form-control guests" 
            id="guests" name="guests"
            defaultValue={venue["maxGuests"]}
            onKeyUp={() => trigger("guests")} 
            onClick={() => trigger("guests")}
            {...register("guests")}/>
        </div>
      </div>
      <p className="text-danger" data-testid="guestsError">{errors.guests?.message}</p>
      <Row className="mb-3">
        <div className="mt-2">
          <label className="me-3 form-label" htmlFor="datePickerDates">Select dates</label>
          <DatePicker
            id="datePickerDates"
            showIcon
            toggleCalendarOnIconClick
            dateFormat="dd/MM/yyyy"
            selectsRange
            onCalendarClose={() => setDateStatus(validateDates(startDate, endDate, excludeDates))}
            onBlur={() => setDateStatus(validateDates(startDate, endDate, excludeDates))}
            excludeDateIntervals={excludeDates}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            maxDate={addDays(new Date(), 730)}
            onChange={(update) => {
              setDateRange(update);
            }}
            required
            showDisabledMonthNavigation
            fixedHeight
            placeholderText="Select dates"
          />
        </div>
        <div  className="text-danger" data-testid="dateError">{feedback}</div>
        <div data-testid="priceSummary">
          {Price(startDate, endDate, Boolean(invalid || errors.guests), venue["price"])}
        </div>
      </Row>
      {accessToken ? 
        <input type="submit" id="list-btn" className="btn btn-primary" value="Book" disabled={enableDisable(!Boolean(invalid || errors.guests))} data-testid={"bookButton"}/> :
        <Button href="/login" disabled={enableDisable(!Boolean(invalid || errors.guests))} data-testid={"bookAnchor"}>Book</Button>
      }
      <div className={type}>{message}</div>
    </form>
  );
}

export default BookForm;