import Functionality from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';

const getAll = async (options) => {
  const searchString = options?.search || '';
  const searchObject = parseSearchString({
    searchString,
    keys: ['title'],
    separator: '+',
  });

  const functionalities = await Functionality.find(searchObject, null, {
    ...parseSkipAndLimit(options),
  });

  // return data
  return {
    data: functionalities,
    message: 'Success',
    status: 200,
  };
};

export default getAll;
