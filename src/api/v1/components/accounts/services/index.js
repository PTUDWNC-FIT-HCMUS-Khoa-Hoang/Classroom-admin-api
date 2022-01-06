import checkAvailability from './checkAvailability';
import deleteOne from './deleteOne';
import getAll from './getAll';
import getOneById from './getOneById';
import postOne from './postOne';
import putOneOther from './putOneOther';

const accountServices = {
  putOneOther,
  getAll,
  checkAvailability,
  postOne,
  getOneById,
  deleteOne,
};

export default accountServices;
