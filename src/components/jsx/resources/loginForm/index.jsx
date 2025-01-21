import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";
import { useState } from "react";
import schema from "../../../js/loginValidation";
import { apiKeyUrl, loginUrl } from "../../../js/constants";
import useUser from "../../store/user";
import { shallow } from "zustand/shallow";
import reRoute from "../../../js/reRoute/reRoute";
import { Link } from "react-router-dom";
import basicApi from "../../../js/basicApi";

/**
 * Creates a login form
 * @returns {HTMLElement} a login form
 */
function LoginForm () {
  const { updateName, updateAccessToken, updateAvatar, updateVenueManager, updateKey } = useUser(
    (state) => ({
      updateName: state.updateName,
      updateAccessToken: state.updateAccessToken,
      updateAvatar: state.updateAvatar,
      updateVenueManager: state.updateVenueManager,
      updateKey: state.updateKey,
    }),
    shallow
  );

  const [status, setStatus] = useState([null, null]);
  const [message, type] = status;

  async function OnSubmit(data, event) {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    const loginOption = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const resp = await basicApi(loginUrl, loginOption);

    if (resp["data"]) {
      updateName(resp["data"]["name"]);
      updateAccessToken(resp["data"]["accessToken"]);
      updateAvatar(resp["data"]["avatar"] ? resp["data"]["avatar"]["url"] : "");
      updateVenueManager(resp["data"]["venueManager"]);
      setStatus(["Login successful", "text-success"]);
      updateKey(await basicApi(apiKeyUrl, {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${resp["data"]["accessToken"]}`,
        },
      }));
      reRoute("/");

      event.target.reset();
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
    <form onSubmit={handleSubmit(OnSubmit)} onChange={clearMessage} className="form-size">
      <h1>Login</h1>
      <div className={type}>{message}</div>
      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <input id="email" name="email" className="form-control" {...register("email")} />
        <p className="text-danger" data-testid="emailError">{errors.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" id="password" name="password" className="form-control" {...register("password")} />
        <p className="text-danger" data-testid="passwordError">{errors.password?.message}</p>
      </div>
      <Button type="submit" className="me-3" data-testid="loginButton">Login</Button>
      <span>Are you a new user?</span>
      <Link to={"/register"} className="ms-1" data-testid="registerLink">Register here</Link>
    </form>
  );
}

export default LoginForm;
