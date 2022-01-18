import Account from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';
import parseSkipAndLimit from '../../../helpers/queries/parseSkipAndLimit';
import parseSortQuery from '../../../helpers/queries/parseSortQuery';

const getAll = async (options) => {
  // search
  const searchString = options?.search || '';
  const searchObject = parseSearchString({
    searchString,
    keys: ['email', 'fullname'],
    separator: '+',
  });

  // sort
  const sortObject = parseSortQuery(options.sortBy, options.order);

  const accounts = await Account.find(searchObject, null, {
    ...parseSkipAndLimit(options),
    sort: sortObject,
  }).populate({ path: 'role' });

  // return data
  return {
    data: accounts,
    message: 'Success',
    status: 200,
  };
};

export default getAll;
