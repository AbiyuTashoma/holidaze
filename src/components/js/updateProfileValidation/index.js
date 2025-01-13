import * as yup from "yup";

/**
 * Update avatar form validation schema
 */
const schema = yup
  .object({
    avatar: yup
      .string()
      .matches(
        /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
        { message: "Enter a valid url" }
      ),
    venueManager: yup.string().required("Select a role."),
  })
  .required();

export default schema;
