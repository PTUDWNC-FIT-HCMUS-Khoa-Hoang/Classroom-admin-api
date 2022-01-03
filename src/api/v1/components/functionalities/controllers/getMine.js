import roleServices from '../../roles/services';

const getMine = async (req, res) => {
  try {
    const roleId = req.user.role;
    const role = await roleServices.getOneById(roleId);

    const { functionalityList } = role;
    res.status(200).send(functionalityList);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getMine;
