import Account from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';
import parseSkipAndLimit from '../../../helpers/queries/parseSkipAndLimit';

const getAll = async (options) => {
  const searchString = options?.search || '';
  const searchObject = parseSearchString({
    searchString,
    keys: ['email', 'fullname'],
    separator: '+',
  });

  const accounts = await Account.find(searchObject, null, {
    ...parseSkipAndLimit(options),
  }).populate({ path: 'role' });

  // return data
  return {
    data: accounts,
    message: 'Success',
    status: 200,
  };
};

export default getAll;
