import Account from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';
import parseSortQuery from '../../../helpers/queries/parseSortQuery';

const getAll = async (options) => {
  // search
  const searchString = options?.search || '';
  const searchObject = parseSearchString(searchString, ['email', 'fullname']);

  // sort
  const sortObject = parseSortQuery(options.sortBy, options.order);

  const accounts = await Account.find(searchObject, null, {
    skip: parseInt(options?.skip),
    limit: parseInt(options?.limit),
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
