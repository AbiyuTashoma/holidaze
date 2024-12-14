import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Name should be at least 3 characters.')
      .required('Enter your full name'),
    email: yup
      .string()
      .email()
      .matches(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, {message: 'Enter a proper email address'})
      .required('Enter your email'),
    subject: yup
      .string()
      .min(3, 'Subject should be at least 3 characters.')
      .required('Enter your subject'),
    message: yup
      .string()
      .min(10, 'Message should be at least 10 characters.')
      .required('Please enter your message'),
  })
  .required();

function ContactForm () {
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
      <h1>Contact us</h1>
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
        <label htmlFor="subject" className='form-label'>Subject</label>
        <input id='subject' name='subject' className='form-control' {...register('subject')} />
        <p className='text-danger'>{errors.subject?.message}</p>
      </div>
      <div>
        <label htmlFor="message" className='form-label'>Message</label>
        <textarea id='message' name='message' className='form-control' {...register('message')}></textarea>
        <p className='text-danger'>{errors.message?.message}</p>
      </div>
      <Button type='submit' className='btn-secondary'>Send</Button>
    </form>
  );
}

export default ContactForm;