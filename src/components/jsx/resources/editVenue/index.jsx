import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import schema from "../../../js/createValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { timeout, url } from "../../../js/constants";
import reRoute from "../../../js/reRoute/reRoute";
import createMedia from "../../../js/createMedia";
import createArray from "../../../js/createArray";
import createString from "../../../js/createString";
import basicApi from "../../../js/basicApi";

/**
 * Creates an edit venue form
 * @param {Object {venue}, String {accessToken}, Object {apiKey}} param0 
 * @returns {HTMLElement} an edit venue form
 */
function EditVenue({venue, accessToken, apiKey}) {

  const [show, setShow] = useState(false);
  const [apiData, setApiData] = useState([null, null]);
  const [message, type] = apiData;

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setApiData([null, null]);
  }

  async function OnSubmit(data) {
    const mediaArray = createArray(data.media);
    const venueData = {
      name: data.name,
      description: data.description,
      media: createMedia(mediaArray, data.name),
      price: data.price,
      maxGuests: data.guest,
      rating: data.rating,
      meta: {
        wifi: data.wifi, 
        parking: data.parking, 
        breakfast: data.breakfast, 
        pets: data.pets,
      },
      location: {
        address: data.address,
        city: data.city,
        country: data.country,
      },
    };

    const updateOption = {
      method: "PUT",
      body: JSON.stringify(venueData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    const resp = await basicApi(url + "/" + venue.id, updateOption);

    if (resp["data"]) {
      setApiData(["Changed successfully", "text-success"]);
      setTimeout(reRoute(window.location.pathname), timeout);
      return;
    }
    else {
      resp["errors"][0]["message"] ? 
        setApiData([resp["errors"][0]["message"], "text-danger"]) :
        setApiData(["Unknown error occurred", "text-danger"]);
      return;
    }
  }

  async function handleDelete() {
    const deleteOption = {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    await fetch(url + "/" + venue.id, deleteOption);
    setTimeout(reRoute(window.location.pathname), timeout);
  }

  function clearMessage() {
    setApiData([null, null]);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <div className="update">
        <Button size="sm" onClick={handleShow} data-testid="editButton">edit</Button>
      </div>        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(OnSubmit)} onChange={clearMessage} className="form-size my-2">
            <div className={type}>{message}</div>
            <div>
              <label htmlFor="name" className="form-label mt-2">Venue name</label>
              <input id="name" name="name" className="form-control" defaultValue={venue["name"]} {...register("name")} />
              <p className="text-danger" data-testid="nameError">{errors.name?.message}</p>
            </div>
            <div>
              <label htmlFor="description" className="form-label">Description</label>
              <textarea id="description" name="description" className="form-control" defaultValue={venue["description"]} {...register("description")}></textarea>
              <p className="text-danger" data-testid="descriptionError">{errors.description?.message}</p>
            </div>
            <div>
              <label htmlFor="media" className="form-label">Image url <span className="fst-italic">(separated by comma)</span></label>
              <input id="media" name="media" className="form-control" defaultValue={createString(venue["media"])} {...register("media")} />
              <p className="text-danger" data-testid="mediaError">{errors.media?.message}</p>
            </div>
            <div>
              <label htmlFor="price" className="form-label">Price</label>
              <input id="price" name="price" className="form-control" defaultValue={venue["price"]} {...register("price")} />
              <p className="text-danger" data-testid="priceError">{errors.price?.message}</p>
            </div>
            <div>
              <label htmlFor="guest" className="form-label">Maximum number of guests</label>
              <input id="guest" name="guest" className="form-control" defaultValue={venue["maxGuests"]} {...register("guest")} />
              <p className="text-danger" data-testid="guestsError">{errors.guest?.message}</p>
            </div>
            <div>
              <label htmlFor="rating" className="form-label">Rating</label>
              <input id="rating" name="rating" className="form-control" defaultValue={venue["rating"]} {...register("rating")} />
              <p className="text-danger" data-testid="ratingError">{errors.rating?.message}</p>
            </div>
            <div className="my-3">
              <div className="mb-3">Services</div>
              <label htmlFor="breakfast" className="ms-3">
                <input type="checkbox" className="form-check-input" name="breakfast" id="breakfast" defaultChecked={venue["meta"]["breakfast"]} {...register("breakfast")}/>
                <span className="ms-1">Breakfast</span>
              </label>
              <label htmlFor="wifi" className="ms-2">
                <input type="checkbox" className="form-check-input" name="wifi" id="wifi" defaultChecked={venue["meta"]["wifi"]} {...register("wifi")}/>
                <span className="ms-1">Wifi</span>
              </label>
              <label htmlFor="parking" className="ms-2">
                <input type="checkbox" className="form-check-input" name="parking" id="parking" defaultChecked={venue["meta"]["parking"]} {...register("parking")}/>
                <span className="ms-1">Parking</span>
              </label>
              <label htmlFor="pets" className="ms-2">
                <input type="checkbox" className="form-check-input" name="pets" id="pets" defaultChecked={venue["meta"]["pets"]} {...register("pets")}/>
                <span className="ms-1">Pets</span>
              </label>
            </div>
            <div className="my-3">
              <div className="mb-3">Location</div>
              <div className="ms-2">
                <div className="input-group">
                  <span className="input-group-text" id="address">Address</span>
                  <input type="text" className="form-control" placeholder="Address" aria-label="address" aria-describedby="address" defaultValue={venue["location"]["address"]} {...register("address")}/>
                </div>
                <p className="text-danger">{errors.address?.message}</p>
                <div className="input-group">
                  <span className="input-group-text" id="city">City</span>
                  <input type="text" className="form-control" placeholder="City" aria-label="city" aria-describedby="city" defaultValue={venue["location"]["city"]} {...register("city")}/>
                </div>
                <p className="text-danger">{errors.city?.message}</p>
                <div className="input-group">
                  <span className="input-group-text" id="country">Country</span>
                  <input type="text" className="form-control" placeholder="country" aria-label="country" aria-describedby="country" defaultValue={venue["location"]["country"]} {...register("country")}/>
                </div>
                <p className="text-danger">{errors.country?.message}</p>
              </div>
            </div>
            <div className="text-center">
              <Button onClick={handleSubmit(OnSubmit)} className="mt-2" variant="primary" type="submit" size="sm" data-testid="saveButton">
                Save Changes
              </Button>
              <Button onClick={handleDelete} className="ms-2 mt-2" variant="secondary" size="sm">
                Delete venue
              </Button>
              <Button onClick={handleClose} className="ms-2 mt-2" variant="secondary" size="sm">
                Close
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditVenue;