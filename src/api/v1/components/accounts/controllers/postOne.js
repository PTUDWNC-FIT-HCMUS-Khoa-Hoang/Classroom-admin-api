import accountServices from '../services';

const postOne = async (req, res) => {
  try {
    const accountData = req.body;

    const account = await accountServices.postOne(accountData);

    res.status(200).send(account);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default postOne;
