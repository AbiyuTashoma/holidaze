import * as yup from "yup";

/**
 * Register form validation schema
 */
const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z0-9_]*$/, {
        message: "Only a-z A-Z 0-9 and _ characters are allowed.",
      })
      .min(3, "Username should be at least 3 characters.")
      .required("Enter your a username"),
    email: yup
      .string()
      .email()
      .matches(/^[\w-.]+@stud.noroff.no$/, {
        message: "Enter a proper email address.",
      })
      .required("Enter your email."),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters.")
      .required("Enter a password."),
    confirmPassword: yup
      .string()
      .min(8, "Password should be at least 8 characters.")
      .oneOf([yup.ref("password")], "Passwords must match.")
      .required("Re-type your password."),
    avatar: yup
      .string()
      .matches(
        /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
        { message: "Enter a valid url.", excludeEmptyString: true }
      ),
    venueManager: yup.string().required("Select a role."),
  })
  .required();

export default schema;
