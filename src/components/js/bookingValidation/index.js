import * as yup from "yup";

const schema = yup
  .object({
    guests: yup
      .number()
      .required("Enter maximum number of guests")
      .min(1)
      .integer(),
  })
  .required();

export default schema;
