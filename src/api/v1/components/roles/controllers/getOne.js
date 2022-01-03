import roleServices from '../services';

const getOne = async (req, res) => {
  try {
    const roleId = req.params.id;
    const role = await roleServices.getOneById(roleId);
    res.status(200).send(role);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getOne;
