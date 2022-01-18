import accountServices from '../services';

const getAll = async (req, res) => {
  const { skip, limit, search, sortBy, order } = req.query;
  try {
    const account = await accountServices.getAll({
      skip,
      limit,
      search,
      sortBy,
      order,
    });
    res.status(200).send(account);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAll;
