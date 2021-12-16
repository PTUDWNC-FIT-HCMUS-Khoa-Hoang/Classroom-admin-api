import yup from 'yup';
import Roles from '../../../constants/role';

const putOne = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(6, 'Password mst contain at least 6 characters.'),
  role: yup.string().oneOf(Object.keys(Roles)),
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
