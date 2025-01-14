import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";
import schema from "../../../js/contactValidation";
import { useState } from "react";

/**
 * Creates contact us page elements
 * @returns {HTMLElement} contact us page elements
 */
function ContactForm () {
  const [apiData, setApiData] = useState([null, null]);
  const [message, type] = apiData;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data, event) {
    setApiData(["Sending successful", "text-success"]);
    event.target.reset();
  }

  function clearMessage() {
    setApiData([null, null]);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={clearMessage} className="form-size">
      <h1>Contact us</h1>
      <div className={type}>{message}</div>
      <div>
        <label htmlFor="name" className="form-label">Name</label>
        <input id="name" name="name" className="form-control" {...register("name")} />
        <p className="text-danger">{errors.name?.message}</p>
      </div>
      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <input id="email" name="email" className="form-control" {...register("email")} />
        <p className="text-danger">{errors.email?.message}</p>
      </div>
      <div>
        <label htmlFor="subject" className="form-label">Subject</label>
        <input id="subject" name="subject" className="form-control" {...register("subject")} />
        <p className="text-danger">{errors.subject?.message}</p>
      </div>
      <div>
        <label htmlFor="message" className="form-label">Message</label>
        <textarea id="message" name="message" className="form-control" {...register("message")}></textarea>
        <p className="text-danger">{errors.message?.message}</p>
      </div>
      <Button type="submit">Send</Button>
    </form>
  );
}

export default ContactForm;