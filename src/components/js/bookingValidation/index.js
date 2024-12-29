import * as yup from "yup";

const schema = yup
  .object({
    guests: yup
      .number("Enter valid number of guests")
      .min(1, "Enter valid number of guests")
      .integer("Enter valid number of guests")
      .required("Enter valid number of guests")
      .typeError("Enter valid number of guests"),
  })
  .required();

export default schema;
