import Classroom from '../model';
import parseSearchString from '../../../helpers/queries/parseSearchString';
import parseSortQuery from '../../../helpers/queries/parseSortQuery';

const getAll = async (options) => {
  // search
  const searchString = options?.search || '';
  const searchObject = parseSearchString({
    searchString,
    keys: ['title'],
    separator: '+',
  });

  // sort
  const sortObject = parseSortQuery(options.sortBy, options.order);

  const classrooms = await Classroom.find(searchObject, null, {
    skip: parseInt(options?.skip),
    limit: parseInt(options?.limit),
    sort: sortObject,
  }).populate({ path: 'owner' });

  // return data
  return {
    data: classrooms,
    message: 'Success',
    status: 200,
  };
};

export default getAll;
