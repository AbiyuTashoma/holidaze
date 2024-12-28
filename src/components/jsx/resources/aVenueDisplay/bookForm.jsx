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

function BookForm({venue, accessToken, apiKey}) {
  const [apiData, setApiData] = useState([null, null]);
  const [message, type] = apiData;
  const [dateStatus, setDateStatus] = useState(false);
  const [dateRange, setDateRange] = useState([new Date(), addDays(new Date(), 3)]);
  const [startDate, endDate] = dateRange;

  const excludeDates = getBooking(venue['bookings']);

  function validateDates(sDate, eDate, exDates) {
    console.log(new Date(sDate), new Date(eDate), exDates);
    let invalidDate = false;
    exDates.map((item) => (invalidDate ||= ((new Date(item['end']) < new Date(eDate)) && (new Date(item['start']) > new Date(sDate)))));
    setDateStatus(invalidDate);
    console.log(invalidDate);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
      <div>
        <label htmlFor="guests" className='form-label'>Guests</label>
        <input type="number" id='guests' name='guests' className='form-control' max={venue["maxGuests"]} {...register('guests')}/>
        <p className='text-danger'>{errors.guests?.message}</p>
      </div>
      <Row className='mb-3'>
        <div className="mt-2">
          <label className="me-3 form-label" htmlFor="dates">Select dates</label>
          <DatePicker
            id="dates"
            showIcon
            toggleCalendarOnIconClick
            dateFormat='dd/MM/yyyy'
            selectsRange
            onCalendarClose={() => validateDates(startDate, endDate, excludeDates)}
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
          />
        </div>
        <div className={dateStatus ? "d-block text-danger" : "d-none"}>Dates are booked, choose other dates.</div>
      </Row>
      {accessToken ? <input type="submit" id="list-btn" className="btn btn-primary" value="Book" disabled={enableDisable(!dateStatus)}/> : <Link to={'/login'} className="btn btn-primary">Book</Link> }
      <div className={type}>{message}</div>
    </form>
  );
}

export default BookForm;