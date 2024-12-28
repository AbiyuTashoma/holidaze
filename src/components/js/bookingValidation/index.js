import * as yup from "yup";

const schema = yup
  .object({
    guests: yup
      .number("enter number of guests")
      .min(1, "invalid")
      .integer("enter number of guests")
      .required("Enter number of guests")
      .typeError("Enter number of guests"),
  })
  .required();

export default schema;
