import * as yup from "yup";

const schema = yup
  .object({
    dateIn: yup.date().required("Enter a valid date"),
    dateOut: yup.date().required("Enter a valid date"),
    guests: yup
      .number()
      .required("Enter maximum number of guests")
      .min(1)
      .integer(),
  })
  .required();

export default schema;
