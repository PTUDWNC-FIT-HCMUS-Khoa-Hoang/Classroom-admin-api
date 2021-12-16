import userServices from '../services';

const deleteOne = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userServices.putOne(userId, {
      isDeleted: true,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default deleteOne;
