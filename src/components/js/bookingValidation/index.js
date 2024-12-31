import * as yup from "yup";

function schema(guests) {
  const schemaGuest = yup
    .object({
      guests: yup
        .number("Enter valid number of guests")
        .min(1, "Enter valid number of guests")
        .max(guests, `Maximum number of guests is ${guests}`)
        .integer("Enter valid number of guests")
        .required("Enter valid number of guests")
        .typeError("Enter valid number of guests"),
    })
    .required();

  return schemaGuest;
}

export default schema;
