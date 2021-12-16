import accountServices from '../services';

const putOne = async (req, res) => {
  const accountId = req.params.id;

  try {
    const updatedAccount = await accountServices.putOneOther(
      accountId,
      req.body
    );
    res.status(200).send(updatedAccount);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default putOne;
