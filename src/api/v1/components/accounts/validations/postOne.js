import yup from 'yup';

const putOne = yup.object().shape({
  email: yup.string().email().required(),
  // password: yup
  //   .string()
  //   .min(6, 'Password mst contain at least 6 characters.')
  //   .required(),
  role: yup.string().required(),
  isVerified: yup.boolean(),
  // address: yup.string(),
  // company: yup.string(),
  // apartment: yup.string(),
  // city: yup.string(),
  // country: yup
  //   .string()
  //   .matches(countryCodeRegex, 'The country name may contain only letters'),
  // zip: yup.string().when('country', isValidCountryCode),
  // status: yup.string().oneOf(Object.keys(Status)),
});

export default putOne;
