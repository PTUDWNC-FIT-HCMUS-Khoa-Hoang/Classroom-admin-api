import userServices from '../services';

const getAll = async (req, res) => {
  const { skip, limit, search, sortBy, order } = req.query;
  try {
    const user = await userServices.getAll({
      skip,
      limit,
      search,
      sortBy,
      order,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAll;
