import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email()
      .matches(/^[\w-.]+@stud.noroff.no*$/, {
        message: "Enter a proper email address.",
      })
      .required("Enter your email."),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters.")
      .required("Enter a password."),
  })
  .required();

export default schema;
