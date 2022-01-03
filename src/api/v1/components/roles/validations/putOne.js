import yup from 'yup';

const putOne = yup
  .object()
  .shape({
    functionalityList: yup.array().of(yup.string()),
  })
  .noUnknown(true);

export default putOne;
