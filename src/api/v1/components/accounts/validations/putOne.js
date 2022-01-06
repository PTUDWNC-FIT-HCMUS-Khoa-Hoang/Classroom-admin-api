import yup from 'yup';

const putOne = yup
  .object()
  .shape({
    email: yup.string().email(),
    password: yup
      .string()
      .min(6, 'Password must contain at least 6 characters.'),
    role: yup.string(),
    isVerified: yup.boolean(),
    isActive: yup.boolean(),
  })
  .noUnknown(true);

export default putOne;
