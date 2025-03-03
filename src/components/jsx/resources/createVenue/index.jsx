import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { timeout, venuesUrl } from "../../../js/constants";
import schema from "../../../js/createValidation";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";
import reRoute from "../../../js/reRoute";
import createMedia from "../../../js/createMedia";
import createArray from "../../../js/createArray";
import basicApi from "../../../js/basicApi";

/**
 * Creates create venue form
 * @returns {HTMLElement} create venue form
 */
function CreateVenue() {
  const [status, setStatus] = useState([null, null]);
  const [message, type] = status;

  const { accessToken, apiKey } = useUser(
    (state) => ({
      accessToken: state.accessToken,
      apiKey: state.apiKey,
    }),
    shallow
  );

  async function OnSubmit(data, event) {
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

    const venueOption = {
      method: "POST",
      body: JSON.stringify(venueData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    const resp = await basicApi(venuesUrl, venueOption);

    if (resp["data"]) {
      setStatus(["Venue successfully created", "text-success"]);
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

  function clearMessage() {
    setStatus([null, null]);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(OnSubmit)} onChange={clearMessage} className="form-size my-4">
      <div>
        <label htmlFor="name" className="form-label">Venue name</label>
        <input id="name" name="name" className="form-control" {...register("name")} />
        <p className="text-danger" data-testid="nameError">{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" name="description" className="form-control" {...register("description")}></textarea>
        <p className="text-danger" data-testid="descriptionError">{errors.description?.message}</p>
      </div>
      <div>
        <label htmlFor="media" className="form-label">Image url <span className="fst-italic">(separated by comma)</span></label>
        <input id="media" name="media" className="form-control" {...register("media")} />
        <p className="text-danger" data-testid="mediaError">{errors.media?.message}</p>
      </div>
      <div>
        <label htmlFor="price" className="form-label">Price</label>
        <input id="price" name="price" className="form-control" {...register("price")} />
        <p className="text-danger" data-testid="priceError">{errors.price?.message}</p>
      </div>
      <div>
        <label htmlFor="guest" className="form-label">Maximum number of guests</label>
        <input id="guest" name="guest" className="form-control" {...register("guest")} />
        <p className="text-danger" data-testid="guestsError">{errors.guest?.message}</p>
      </div>
      <div>
        <label htmlFor="rating" className="form-label">Rating</label>
        <input id="rating" name="rating" className="form-control" {...register("rating")} />
        <p className="text-danger" data-testid="ratingError">{errors.rating?.message}</p>
      </div>
      <div className="my-3">
        <div className="mb-3">Services</div>
        <label htmlFor="breakfast" className="ms-3">
          <input type="checkbox" className="form-check-input" name="breakfast" id="breakfast" data-testid="breakfast" {...register("breakfast")}/>
          <span className="ms-1">Breakfast</span>
        </label>
        <label htmlFor="wifi" className="ms-2">
          <input type="checkbox" className="form-check-input" name="wifi" id="wifi" data-testid="wifi" {...register("wifi")}/>
          <span className="ms-1">Wifi</span>
        </label>
        <label htmlFor="parking" className="ms-2">
          <input type="checkbox" className="form-check-input" name="parking" id="parking" data-testid="parking" {...register("parking")}/>
          <span className="ms-1">Parking</span>
        </label>
        <label htmlFor="pets" className="ms-2">
          <input type="checkbox" className="form-check-input" name="pets" id="pets" data-testid="pets" {...register("pets")}/>
          <span className="ms-1">Pets</span>
        </label>
      </div>
      <div className="my-3">
        <div className="mb-3">Location</div>
        <div className="ms-2">
          <div className="input-group">
            <span className="input-group-text" id="address">Address</span>
            <input type="text" className="form-control" placeholder="Address" aria-label="address" aria-describedby="address" {...register("address")}/>
          </div>
          <p className="text-danger">{errors.address?.message}</p>
          <div className="input-group">
            <span className="input-group-text" id="city">City</span>
            <input type="text" className="form-control" placeholder="City" aria-label="city" aria-describedby="city" {...register("city")}/>
          </div>
          <p className="text-danger">{errors.city?.message}</p>
          <div className="input-group">
            <span className="input-group-text" id="country">Country</span>
            <input type="text" className="form-control" placeholder="country" aria-label="country" aria-describedby="country" {...register("country")}/>
          </div>
          <p className="text-danger">{errors.country?.message}</p>
        </div>
      </div>
      <div className={type}>{message}</div>
      <div className="text-center">
        <input type="submit" id="list-btn" className="btn btn-primary" value="Create venue" data-testid="createButton"/>
      </div>
    </form>
  );
}

export default CreateVenue;