import Account from '../model';

const getOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findById(id);
    console.log(
      '🚀 ~ file: getOneById.js ~ line 7 ~ getOneById ~ account',
      account
    );
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
