import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../../js/bookingValidation";
import { Button, Col, Modal, Row } from "react-bootstrap";
import reRoute from "../../../js/reRoute";
import { useState } from "react";
import { bookingsUrl, currency, timeout, unit, venuesUrl } from "../../../js/constants";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import getBooking from "../../../js/getBooking";
import enableDisable from "../../../js/enableDisable";
import validateDates from "../../../js/validateDates";
import Price from "../price";
import basicApi from "../../../js/basicApi";
import ImageCarousel from "../imageCarousel";
import StarRating from "../starRating";
import Facility from "../facility";
import VenueName from "../venueName";
import VenueDescription from "../venueDescription";

/**
 * Creates an edit booking modal element
 * @param {Object {bookingsList}, Object {booking}, String {accessToken}, Object {apiKey}} param0 
 * @returns {HTMLElement} an edit booking modal element
 */

function EditBooking({booking, accessToken, apiKey}) {
  const [excludeDates, setExcludeDates] = useState([]);
  const [status, setStatus] = useState([null, null]);
  const [message, type] = status;
  const [dateStatus, setDateStatus] = useState([false, ""]);
  const [invalid, feedback] = dateStatus;
  const [dateRange, setDateRange] = useState([new Date(booking["dateFrom"]), new Date(booking["dateTo"])]);
  const [startDate, endDate] = dateRange;
  const [show, setShow] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseModalTwo = () =>{
    setShowModalTwo(false);
    setShow(true);
  }
  const handleShow = () => {
    setShow(true);
    setStatus([null, null]);
    getVenueBooking(booking["venue"]["id"]);
  }
  const handleShowModalTwo = () => {
    setShowModalTwo(true);
    setShow(false);
  }

  async function getVenueBooking(venueId) {
    const data = await basicApi(venuesUrl + "/" + venueId + "?_bookings=true&_owner=true");
    if (data["data"]) {
      const previousList = data["data"]["bookings"].filter((item) => item.id !== booking.id);
      const exDates = getBooking(previousList);
      setExcludeDates(exDates);
      return;
    }
  }

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema(booking["venue"]["maxGuests"])),
  });

  async function OnSubmit(data, event) {
    const bookData = {
      dateFrom: startDate,
      dateTo: endDate,
      guests: data.guests,
    };

    const updateOption = {
      method: "PUT",
      body: JSON.stringify(bookData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    const resp = await basicApi(bookingsUrl + "/" + booking.id, updateOption);

    if (resp["data"]) {
      setStatus(["Booking successfully updated", "text-success"]);
      event.target.reset();
      setTimeout(reRoute(window.location.pathname), timeout);
      return;
    }
    else {
      resp["errors"][0]["message"] ? 
        setStatus([resp["errors"][0]["message"], "text-danger"]) :
        setStatus(["Unknown error occurred", "text-danger"]);
      return;
    }    
  }

  async function handleDelete(id) {
    const deleteOption = {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    await fetch(bookingsUrl + "/" + id, deleteOption);
    setTimeout(reRoute(window.location.pathname), timeout);
  }

  return (
    <div>
      <Button 
        className="btn-secondary btn-sm ms-2" 
        onClick={handleShow} disabled={enableDisable(new Date(booking["dateFrom"]) > new Date())} 
        data-testid="manageButton">Manage booking</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-4">        
            <Col sm={6} className="position-relative">
              {ImageCarousel(booking["venue"]["media"])}          
              {StarRating(booking["venue"]["rating"])}
            </Col>
            <Col>
              <div className="my-2">{VenueName(booking["venue"]["name"])}</div>
              <div data-testid="venuePrice">{booking["venue"]["price"]} {currency}<span className="unit">{unit}</span></div>
              {VenueDescription(booking["venue"]["description"])}
              <div data-testid="maxGuests">Max guests: {booking["venue"]["maxGuests"]}</div>
              <div>{Facility(booking["venue"]["meta"])}</div>
            </Col>
          </Row>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="fw-semibold my-2">Check availability</div>
            <div className="d-flex gap-3 align-items-top">
              <label htmlFor="guests" className="form-label mt-1">Number of guests</label>
              <div>
                <input 
                  type="number" 
                  className="form-control guests" 
                  id="guests" name="guests"
                  defaultValue={booking["guests"]}
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
                  onChange={(update) => { setDateRange(update); }}
                  required
                  showDisabledMonthNavigation
                  fixedHeight
                  placeholderText="Select dates"
                />
              </div>
              <div  className="text-danger" data-testid="dateError">{feedback}</div>
              <div data-testid="priceSummary">
                {Price(startDate, endDate, Boolean(invalid || errors.guests), booking["venue"]["price"])}
              </div>
            </Row>
            <div className={type}>{message}</div>
            <div className="text-center">
              <input type="submit" id="list-btn" className="btn btn-primary btn-sm mt-2" value="Update booking" disabled={enableDisable(!Boolean(invalid || errors.guests))} data-testid={"bookButton"}/>
              <Button 
                className="btn-sm ms-2 mt-2" variant="secondary" 
                onClick={handleShowModalTwo} 
                data-testid="cancelButton">Cancel booking</Button>
              <Button onClick={handleClose} className="btn-sm ms-2 mt-2" variant="secondary">Close</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showModalTwo} onHide={handleCloseModalTwo} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel the venue booking?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Button 
              className="btn-sm ms-2 mt-2" variant="primary" 
              onClick={() => handleDelete(booking.id)} 
              data-testid="cancelButton">
                Yes, Cancel booking</Button>
            <Button onClick={handleCloseModalTwo} className="ms-2 mt-2" variant="secondary" size="sm">
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditBooking;