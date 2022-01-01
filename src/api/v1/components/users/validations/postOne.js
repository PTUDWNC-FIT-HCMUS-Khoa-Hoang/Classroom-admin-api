import yup from 'yup';
import { countryCodeRegex, isValidCountryCode } from './countryCode';

const postOne = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, 'Password must contain at least 6 characters.')
      .required(),
    fullname: yup.string().required(),
    address: yup.string(),
    company: yup.string(),
    apartment: yup.string(),
    city: yup.string(),
    country: yup
      .string()
      .matches(countryCodeRegex, 'The country name may contain only letters'),
    zip: yup.string().when('country', isValidCountryCode),
    isDeleted: yup.boolean(),
    isVerified: yup.boolean(),
    isActive: yup.boolean(),
  })
  .noUnknown(true);

export default postOne;
