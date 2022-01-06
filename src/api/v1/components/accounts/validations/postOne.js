import yup from 'yup';

const putOne = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  role: yup.string().required(),
  isVerified: yup.boolean(),
  isActive: yup.boolean(),
});

export default putOne;
