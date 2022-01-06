import Account from '../model';

const getOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findById(id).populate({ path: 'role' });
    if (!account) {
      throw new Error('Not found');
    }
    res.status(200).send(account);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getOneById;
