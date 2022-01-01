import userServices from '../services';

const postOne = async (req, res) => {
  try {
    const userData = req.body;

    const newUser = await userServices.postOne(userData);

    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postOne;
