import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';

const schema = yup
  .object({
    fullName: yup
      .string()
      .min(3, 'Full name should be at least 3 characters.')
      .required('Please enter your full name'),
    email: yup
      .string()
      .email()
      .matches(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, {message: 'Enter a proper email address'})
      .required('Please enter your email'),
    subject: yup
      .string()
      .min(3, 'Your subject should be at least 3 characters.')
      .required('Please enter your subject'),
    message: yup
      .string()
      .min(3, 'Your message should be at least 3 characters.')
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