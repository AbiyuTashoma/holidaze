import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'react-bootstrap';
import { useState } from "react";
import api from '../../../js/api';
import schema from '../../../js/loginValidation';
import { loginUrl } from '../../../js/constants';

function LoginForm () {
  const [apiData, setApiData] = useState([null, null]);
  const [message, type] = apiData;

  function OnSubmit(data, event) {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    console.log(loginData);

    const loginOption = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const resp = api(loginUrl, loginOption);

    if (resp["data"]) {
      setApiData(["Login successful", "text-success"]);
      event.target.reset();
      return;
    }
    else {
      setApiData(["Unknown error occurred", "text-danger"]);
      return;
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(OnSubmit)} className='form-size'>
      <h1>Login</h1>
      <div className={type}>{message}</div>
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
      <Button type='submit' className='btn-secondary'>Login</Button>
    </form>
  );
}

export default LoginForm;
