import User from '../model';
import userServices from '../services';

const putOne = async (req, res) => {
  const userId = req.params.id;
  try {
    // Update user
    const updatedUser = await userServices.putOne(userId, req.body);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOne;
