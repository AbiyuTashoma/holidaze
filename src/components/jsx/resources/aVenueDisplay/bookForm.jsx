import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from "../../../js/bookingValidation";
import { Col, Row } from "react-bootstrap";
import reRoute from '../../../js/reRoute/reRoute';
import { Link } from 'react-router-dom';

function BookForm({venue, accessToken, apiKey}) {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function OnSubmit(data, event) {
  //   !accessToken ? reRoute("/login") : book(data, event);
  // }

  // async function book(data, event) {
    const bookData = {
      dateFrom: data.dateIn,
      dateTo: data.dateOut,
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

    // const resp = await api(url, bookOption);

    console.log(bookData);
    console.log(bookOption);
    // if (resp["data"]) {
    //   setApiData(["Venue successful created", "text-success"]);
    //   event.target.reset();
    //   setTimeout(reRoute("/"), 1500);
    //   return;
    // }
    // else {
    //   setApiData(["Unknown error occurred", "text-danger"]);
    //   return;
    // }    
  }

  return(
    <form onSubmit={handleSubmit(OnSubmit)}>
      <div>
        <label htmlFor="guests" className='form-label'>Guests</label>
        <input type="number" id='guests' name='guests' className='form-control' max={venue["maxGuests"]} {...register('guests')}/>
        <p className='text-danger'>{errors.guests?.message}</p>
      </div>
      <Row className="mb-3">
        <Col>
          <label className="form-label" htmlFor="dateIn">Date In</label>
          <input type="date" className="form-control" id="dateIn" name="dateIn" {...register('dateIn')}/>
          <p className='text-danger'>{errors.dateIn?.message}</p>
        </Col>
        <Col>
          <label className="form-label" htmlFor="dateOut">Date In</label>
          <input type="date" className="form-control" id="dateOut" name="dateOut" {...register('dateOut')}/>
          <p className='text-danger'>{errors.dateOut?.message}</p>
        </Col>
      </Row>
      {accessToken ? <input type="submit" id="list-btn" className="btn btn-primary" value="Book"/> : <Link to={'/login'} className="btn btn-primary">Book</Link> }
      {/* <input type="submit" id="list-btn" className="btn btn-primary" value="Book"/> */}
    </form>
  );
}

export default BookForm;