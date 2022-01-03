import roleServices from '../services';

const getAll = async (req, res) => {
  const { skip, limit, search } = req.query;
  try {
    const roles = await roleServices.getAll({
      skip,
      limit,
      search,
    });
    res.status(200).send(roles);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAll;
