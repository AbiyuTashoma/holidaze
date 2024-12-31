import * as yup from "yup";
import createArray from "../createArray";

const schema = yup
  .object({
    name: yup
      .string()
      .min(3, "Name should be at least 3 characters.")
      .required("Enter your full name"),
    description: yup
      .string()
      .min(10, "description should be at least 10 characters.")
      .required("Enter venue description"),
    price: yup
      .number()
      .required("Enter your price")
      .min(0)
      .integer()
      .typeError("Enter venue price"),
    guest: yup
      .number()
      .required("Enter the maximum number of guests")
      .min(1)
      .integer()
      .typeError("Enter the maximum number of guests"),

    media: yup
      .string()
      .test("media", "Enter valid url separated by comma (,)", (value) =>
        validUrl(value)
      ),
    rating: yup
      .number()
      .required("Enter venue rating (0-5)")
      .min(0)
      .max(5)
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

function validUrl(value) {
  const urlMatch =
    /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
  const urlArray = createArray(value);
  let valid = true;

  if (value) {
    urlArray.map((url) => (valid &&= urlMatch.test(url)));
  }

  return valid;
}

export default schema;
