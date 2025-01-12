import * as yup from "yup";

/**
 * Contact us form validation schema
 */
const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Name should be at least 3 characters.")
      .required("Enter your full name"),
    email: yup
      .string()
      .email()
      .matches(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, {
        message: "Enter a proper email address",
      })
      .required("Enter your email"),
    subject: yup
      .string()
      .min(3, "Subject should be at least 3 characters.")
      .required("Enter your subject"),
    message: yup
      .string()
      .min(10, "Message should be at least 10 characters.")
      .required("Please enter your message"),
  })
  .required();

export default schema;
