import { shallow } from "zustand/shallow";
import useUser from "../../store/user";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import schema from "../../../js/updateValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiKeyUrl, updateUrl } from "../../../js/constants";
import api from "../../../js/api";

export default function ProfileInfo() {
  const { name, accessToken, avatar, updateAvatar } = useUser(
    (state) => ({
      name: state.name,
      accessToken: state.accessToken,
      avatar: state.avatar,
      updateAvatar: state.updateAvatar,
    }),
    shallow
  );

  const [show, setShow] = useState(false);
  const [apiData, setApiData] = useState([null, null]);
  const [message, type] = apiData;

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setApiData([null, null]);
  }

  async function OnSubmit(data) {
    const newAvatar = {
      avatar: {url:data.avatar, alt:"avatar"},
    };

    const apiKeyOption = {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const apiKey = await api(apiKeyUrl, apiKeyOption);

    const updateOption = {
      method: "PUT",
      body: JSON.stringify(newAvatar),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey.data.key,
      },
    };

    const resp = await api(updateUrl + name, updateOption);

    if (resp["data"]) {
      setApiData(["Change successful", "text-success"]);
      updateAvatar(data.avatar);
      setTimeout(handleClose, 1500);
      return;
    }
    else {
      setApiData(["Unknown error occurred", "text-danger"]);
      return;
    }
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
      <div className="avatar-container position-relative mx-auto">
        <img src={avatar} className="avatar border rounded" alt="avatar"/>
        <button onClick={handleShow} className="btn btn-outline-primary position-absolute top-100 start-100 translate-middle px-1 py-0">change</button>
      </div>        
      <p class="my-3 text-center">{name}</p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={type}>{message}</div>
          <label htmlFor="avatar" className='form-label fst-italic'>Avatar url</label>
          <input id='avatar' name='avatar' className='form-control' placeholder={avatar} {...register('avatar')} onChange={clearMessage}/>
          <p className='text-danger'>{errors.avatar?.message}</p>
          <div className='text-center'>
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