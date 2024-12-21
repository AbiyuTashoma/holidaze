import * as yup from "yup";

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
    price: yup.number().required("Enter your price").min(0).integer(),
    guest: yup
      .number()
      .required("Enter maximum number of guests")
      .min(1)
      .integer(),
    media: yup
      .string()
      .matches(
        /^(http(s)?:\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
        { message: "Enter a valid url", excludeEmptyString: true }
      ),
    rating: yup
      .number()
      .required("Enter venue rating (0-5)")
      .min(0)
      .max(5)
      .integer(),
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
