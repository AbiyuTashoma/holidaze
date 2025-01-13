import * as yup from "yup";
import validateUrl from "../validateUrls";

/**
 * Create venue form validation schema
 */
const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Name should be at least 3 characters.")
      .required("Enter your full name"),
    description: yup
      .string()
      .min(10, "Description should be at least 10 characters.")
      .required("Enter venue description"),
    price: yup
      .number()
      .required("Enter valid venue price")
      .min(0, "Enter valid venue price")
      .integer()
      .typeError("Enter valid venue price"),
    guest: yup
      .number()
      .required("Enter the maximum number of guests")
      .min(1, "Enter the maximum number of guests")
      .integer()
      .typeError("Enter the maximum number of guests"),

    media: yup
      .string()
      .test("media", "Enter valid url separated by comma (,)", (value) =>
        validateUrl(value)
      ),
    rating: yup
      .number()
      .required("Enter venue rating (0-5)")
      .min(0, "Enter venue rating (0-5)")
      .max(5, "Enter venue rating (0-5)")
      .integer()
      .typeError("Enter venue rating (0-5)"),
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
    address: yup.string().max(50),
    city: yup.string().max(50),
    country: yup.string().max(50),
  })
  .required();

export default schema;
