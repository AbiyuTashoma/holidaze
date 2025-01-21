import { shallow } from "zustand/shallow";
import useUser from "../../store/user";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import schema from "../../../js/updateProfileValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profilesUrl, timeout } from "../../../js/constants";
import basicApi from "../../../js/basicApi";

/**
 * Creates a users' profile information summary
 * @returns {HTMLElement} users' profile information
 */
function ProfileInfo() {
  const { name, accessToken, avatar, venueManager, apiKey, updateVenueManager, updateAvatar } = useUser(
    (state) => ({
      name: state.name,
      accessToken: state.accessToken,
      avatar: state.avatar,
      venueManager: state.venueManager,
      apiKey: state.apiKey,
      updateAvatar: state.updateAvatar,
      updateVenueManager: state.updateVenueManager,
    }),
    shallow
  );

  const [show, setShow] = useState(false);
  const [status, setStatus] = useState([null, null]);
  const [message, type] = status;

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setStatus([null, null]);
  }

  async function OnSubmit(data) {
    const newAvatar = {
      avatar: {url:data.avatar, alt:"avatar"},
      venueManager: data.venueManager==="true" ? true: false,
    };

    const updateOption = {
      method: "PUT",
      body: JSON.stringify(newAvatar),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    const resp = await basicApi(profilesUrl + "/" + name, updateOption);

    if (resp["data"]) {
      setStatus(["Change successful", "text-success"]);
      updateAvatar(resp["data"]["avatar"]["url"]);
      updateVenueManager(resp["data"]["venueManager"]);
      setTimeout(handleClose, timeout);
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
    <div className="my-4">
      <div className="avatar-container position-relative mx-auto mb-4">
        <img src={avatar} className="avatar border rounded" alt="avatar"/>
        <button onClick={handleShow} className="btn btn-primary position-absolute top-100 start-100 translate-middle text-nowrap px-1 py-0">Edit profile</button>
      </div>        
      <p className="m-0 text-center">{name}</p>
      <p className="mb-4 text-center">Role: {venueManager ? "venue manager" : "user"}</p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={type}>{message}</div>
          <label htmlFor="avatar" className="form-label fst-italic">Avatar url</label>
          <input id="avatar" name="avatar" className="form-control" defaultValue={avatar} {...register("avatar")} onChange={clearMessage}/>
          <p className="text-danger">{errors.avatar?.message}</p>
          <div>
            <label htmlFor="venueManager" className="form-label">Select a role</label>
            <select id="venueManager" name="venueManager" className="form-control" defaultValue={venueManager} {...register("venueManager")}>
              <option value={false}>User</option>
              <option value={true}>Venue Manager</option>
            </select>
            <p className="text-danger" data-testid="roleError">{errors.venueManager?.message}</p>
          </div>
          <div className="text-center">
            <Button variant="primary" type="submit" onClick={handleSubmit(OnSubmit)}>
              Save Changes
            </Button>
            <Button className="ms-2" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProfileInfo;