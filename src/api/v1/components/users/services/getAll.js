import User from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';
import parseSortQuery from '../../../helpers/queries/parseSortQuery';

const getAll = async (options) => {
  // search
  const searchString = options?.search || '';
  const searchObject = parseSearchString({
    searchString,
    keys: ['email', 'fullname', 'studentId'],
    separator: '+',
  });

  // sort
  const sortObject = parseSortQuery(options.sortBy, options.order);

  const users = await User.find(searchObject, null, {
    skip: parseInt(options?.skip),
    limit: parseInt(options?.limit),
    sort: sortObject,
  });

  // return data
  return {
    data: users,
    message: 'Success',
    status: 200,
  };
};

export default getAll;
