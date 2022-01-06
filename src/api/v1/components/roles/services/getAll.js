import Role from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';

const getAll = async (options) => {
  const searchString = options?.search || '';
  const searchObject = parseSearchString(searchString, ['title'], '+');

  const roles = await Role.find(searchObject, null, {
    skip: parseInt(options?.skip),
    limit: parseInt(options?.limit),
  }).populate({ path: 'functionalityList' });

  // return data
  return {
    data: roles,
    message: 'Success',
    status: 200,
  };
};

export default getAll;
