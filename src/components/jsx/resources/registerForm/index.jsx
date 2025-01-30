import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";
import { defaultAvatar, registerUrl, timeout } from "../../../js/constants";
import { useState } from "react";
import schema from "../../../js/registerValidation";
import reRoute from "../../../js/reRoute";
import basicApi from "../../../js/basicApi";

/**
 * Creates a register form
 * @returns {HTMLElement} a register form
 */
function RegisterForm () {
  const [status, setStatus] = useState([null, null]);
  const [message, type] = status;

  async function OnSubmit(data, event) {
    const registerData = {
      name: data.name,
      email: data.email,
      password: data.password,
      venueManager: data.venueManager==="true" ? true: false,
      avatar: {url:data.avatar !== "" ? data.avatar : defaultAvatar, alt:"avatar"},
    };

    const registerOption = {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const resp = await basicApi(registerUrl, registerOption);

    if (resp["data"]) {
      setStatus(["Registration successful", "text-success"]);
      event.target.reset();
      setTimeout(reRoute("/login"), timeout);
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
      <h1>Register</h1>
      <div className={type}>{message}</div>
      <div>
        <label htmlFor="name" className="form-label">Username</label>
        <input id="name" name="name" className="form-control" {...register("name")} />
        <p className="text-danger" data-testid="usernameError">{errors.name?.message}</p>
      </div>
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
      <div>
        <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" className="form-control" {...register("confirmPassword")} />
        <p className="text-danger" data-testid="confirmError">{errors.confirmPassword?.message}</p>
      </div>
      <div>
        <label htmlFor="venueManager" className="form-label">Select a role</label>
        <select id="venueManager" name="venueManager" className="form-control" {...register("venueManager")}>
          <option value="" default className="fst-italic">Select a role</option>
          <option value={false}>User</option>
          <option value={true}>Venue Manager</option>
        </select>
        <p className="text-danger" data-testid="roleError">{errors.venueManager?.message}</p>
      </div>
      <div>
        <label htmlFor="avatar" className="form-label fst-italic">Avatar url (optional)</label>
        <input id="avatar" name="avatar" className="form-control" {...register("avatar")} />
        <p className="text-danger" data-testid="avatarError">{errors.avatar?.message}</p>
      </div>
      <div className="text-center">
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}

export default RegisterForm;
