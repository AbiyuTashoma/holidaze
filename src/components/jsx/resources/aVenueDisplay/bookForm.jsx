import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from "../../../js/bookingValidation";
import { Row } from "react-bootstrap";
import reRoute from '../../../js/reRoute/reRoute';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { bookingsUrl, timeout } from '../../../js/constants';
import api from '../../../js/api';
import { addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import getBooking from '../../../js/getBooking';
import enableDisable from '../../../js/enableDisable';
import validateDates from '../../../js/validateDates';
import Price from '../price';

function BookForm({venue, accessToken, apiKey}) {
  const [apiData, setApiData] = useState([null, null]);
  const [message, type] = apiData;
  const [dateStatus, setDateStatus] = useState([null, ""]);
  const [invalid, feedback] = dateStatus;
  const [dateRange, setDateRange] = useState([new Date(), addDays(new Date(), 3)]);
  const [startDate, endDate] = dateRange;

  const excludeDates = getBooking(venue['bookings']);

  const {
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
      setTimeout(reRoute(window.location.pathname), timeout);
      return;
    }
    else {
      setApiData(["Unknown error occurred", "text-danger"]);
      return;
    }    
  }

  return(
    <form onSubmit={handleSubmit(OnSubmit)}>
      <div className="fw-semibold my-2">Check availability</div>
      <div className='d-flex gap-3 align-items-top'>
        <label htmlFor="guests" className='form-label mt-1'>Guests</label>
        <div>
          <input type="number" id='guests' name='guests' className='form-control guests' {...register('guests')}/>
          <p className='text-danger'>{errors.guests?.message}</p>
        </div>
      </div>
      <Row className='mb-3'>
        <div className="mt-2">
          <label className="me-3 form-label" htmlFor="dates">Select dates</label>
          <DatePicker
            id="datePickerDates"
            showIcon
            toggleCalendarOnIconClick
            dateFormat='dd/MM/yyyy'
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
        <div>
          {Price(startDate, endDate, invalid, venue['price'])}
        </div>
        <div className={invalid ? "d-block text-danger" : "d-none"}>{feedback}</div>
      </Row>
      {accessToken ? <input type="submit" id="list-btn" className="btn btn-primary" value="Book" disabled={enableDisable(!invalid)} data-testid={'bookButton'}/> : <Link to={'/login'} className="btn btn-primary" data-testid={'bookAnchor'}>Book</Link> }
      <div className={type}>{message}</div>
    </form>
  );
}

export default BookForm;