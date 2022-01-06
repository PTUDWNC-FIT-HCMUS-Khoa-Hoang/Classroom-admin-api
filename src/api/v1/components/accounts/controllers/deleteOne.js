import accountServices from '../services';

const deleteOne = async (req, res) => {
  try {
    const accountId = req.params.id;

    const deletedAccount = await accountServices.deleteOne(accountId);

    res.status(200).send(deletedAccount);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default deleteOne;
