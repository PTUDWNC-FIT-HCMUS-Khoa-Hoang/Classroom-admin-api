import roleServices from '../services';

const putOne = async (req, res) => {
  try {
    const roleId = req.params.id || req.params.roleId;
    const roleData = req.body;

    const role = await roleServices.putOneById(roleId, roleData);
    res.status(200).send(role);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOne;
