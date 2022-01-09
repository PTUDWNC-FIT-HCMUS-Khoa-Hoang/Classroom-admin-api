import Role from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';
import parseSkipAndLimit from '../../../helpers/queries/parseSkipAndLimit';

const getAll = async (options) => {
  const searchString = options?.search || '';
  const searchObject = parseSearchString({
    searchString,
    keys: ['title'],
    separator: '+',
  });

  const roles = await Role.find(searchObject, null, {
    ...parseSkipAndLimit(options),
  }).populate({ path: 'functionalityList' });

  // return data
  return {
    data: roles,
    message: 'Success',
    status: 200,
  };
};

export default getAll;
