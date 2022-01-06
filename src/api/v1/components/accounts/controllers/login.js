import parseErrorIntoMessage from '../../../helpers/parseErrorIntoMessage';
import Account from '../model';

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const account = await Account.findByCredentials(email, password);

    if (account.isDeleted) {
      throw new Error('Email or password is invalid');
    }

    const token = account.generateToken();
    res.status(200).send({
      user: account,
      token,
    });
  } catch (error) {
    res.status(400).send(parseErrorIntoMessage(error));
  }
};

export default login;
