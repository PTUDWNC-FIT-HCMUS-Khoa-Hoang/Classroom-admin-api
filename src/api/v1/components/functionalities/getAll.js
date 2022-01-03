import accountServices from '../services';

const getAll = async (req, res) => {
  const { skip, limit, search } = req.query;
  try {
    const account = await accountServices.getAll({
      skip,
      limit,
      search,
    });
    res.status(200).send(account);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAll;
