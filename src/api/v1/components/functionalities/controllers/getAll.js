import functionalityServices from '../services';

const getAll = async (req, res) => {
  const { skip, limit, search } = req.query;
  try {
    const functionalities = await functionalityServices.getAll({
      skip,
      limit,
      search,
    });
    res.status(200).send(functionalities);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getAll;
