import classroomServices from '../services';

const getAll = async (req, res) => {
  const { skip, limit, search, sortBy, order } = req.query;
  try {
    const classrooms = await classroomServices.getAll({
      skip,
      limit,
      search,
      sortBy,
      order,
    });
    res.status(200).send(classrooms);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAll;
