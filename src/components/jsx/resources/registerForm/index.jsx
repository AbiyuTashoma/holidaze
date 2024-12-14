import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';

const schema = yup
  .object({
    fullName: yup
      .string()
      .matches(/^[a-zA-Z0-9_]*$/, {message: 'Only a-z A-Z 0-9 and _ characters are allowed'})
      .min(3, 'Full name should be at least 3 characters.')
      .required('Please enter your full name'),
    email: yup
      .string()
      .email()
      .matches(/^[\w-.]+@stud.noroff.no/, {message: 'Enter a proper email address'})
      .required('Please enter your email'),
    password: yup
      .string()
      .min(8, 'Password should be at least 8 characters.')
      .required('Please enter your password'),
    confirmPassword: yup
      .string()
      .min(8, 'Password should be at least 8 characters.')
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please enter your password'),
    avatar: yup
      .string()
      .matches(/^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/, {message: 'Enter a valid url', excludeEmptyString: true})
  })
  .required();

function RegisterForm () {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data, event) {
    console.log(data);
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-size'>
      <h1>Register</h1>
      <div>
        <label htmlFor="fullName" className='form-label'>Full name</label>
        <input id='fullName' name='fullName' className='form-control' {...register('fullName')} />
        <p className='text-danger'>{errors.fullName?.message}</p>
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
        <label htmlFor="avatar" className='form-label fst-italic'>Avatar url (optional)</label>
        <input id='avatar' name='avatar' className='form-control' {...register('avatar')} />
        <p className='text-danger'>{errors.avatar?.message}</p>
      </div>
      <Button type='submit' className='btn-secondary'>Register</Button>
    </form>
  );
}

export default RegisterForm;
