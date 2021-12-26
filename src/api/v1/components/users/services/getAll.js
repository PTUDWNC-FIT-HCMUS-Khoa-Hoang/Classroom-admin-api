import User from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';

const getAll = async (options) => {
  const searchString = options?.search || '';
  const searchObject = parseSearchString(searchString, [
    'email',
    'fullname',
    'studentId',
  ]);

  const users = await User.find(searchObject, null, {
    skip: parseInt(options?.skip),
    limit: parseInt(options?.limit),
  });

  // return data
  return {
    data: users,
    message: 'Success',
    status: 200,
  };
};

export default getAll;
