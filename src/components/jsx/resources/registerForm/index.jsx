import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'react-bootstrap';
import { defaultAvatar, registerUrl } from '../../../js/constants';
import { useState } from "react";
import api from '../../../js/api';
import schema from '../../../js/registerValidation';
import reRoute from '../../../js/reRoute/reRoute';

function RegisterForm () {
  const [apiData, setApiData] = useState([null, null]);
  const [message, type] = apiData;

  async function OnSubmit(data, event) {
    const registerData = {
      name: data.name,
      email: data.email,
      password: data.password,
      venueManager: data.venueManager==="true" ? true: false,
      avatar: {url:data.avatar !== "" ? data.avatar : defaultAvatar, alt:"avatar"},
    };

    console.log(registerData);

    const registerOption = {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const resp = await api(registerUrl, registerOption);

    if (resp["data"]) {
      setApiData(["Registration successful", "text-success"]);
      event.target.reset();
      setTimeout(reRoute("/login"), 1500);
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
    <form onSubmit={handleSubmit(OnSubmit)} onChange={clearMessage} className='form-size'>
      <h1>Register</h1>
      <div className={type}>{message}</div>
      <div>
        <label htmlFor="name" className='form-label'>Name</label>
        <input id='name' name='name' className='form-control' {...register('name')} />
        <p className='text-danger'>{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="email" className='form-label'>Email</label>
        <input id='email' name='email' className='form-control' {...register('email')} />
        <p className='text-danger'>{errors.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password" className='form-label'>Password</label>
        <input type='password' id='password' name='password' className='form-control' {...register('password')} />
        <p className='text-danger'>{errors.password?.message}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className='form-label'>Confirm password</label>
        <input type='password' id='confirmPassword' name='confirmPassword' className='form-control' {...register('confirmPassword')} />
        <p className='text-danger'>{errors.confirmPassword?.message}</p>
      </div>
      <div>
        <label htmlFor="venueManager" className='form-label'>Select a role</label>
        <select id='venueManager' name='venueManager' className='form-control' {...register('venueManager')}>
          <option value="" default className='fst-italic'>Select a role</option>
          <option value={false}>User</option>
          <option value={true}>Venue Manager</option>
        </select>
        <p className='text-danger'>{errors.venueManager?.message}</p>
      </div>
      <div>
        <label htmlFor="avatar" className='form-label fst-italic'>Avatar url (optional)</label>
        <input id='avatar' name='avatar' className='form-control' {...register('avatar')} />
        <p className='text-danger'>{errors.avatar?.message}</p>
      </div>
      <Button type='submit' className='btn-secondary'>Register</Button>
    </form>
  );
}

export default RegisterForm;
