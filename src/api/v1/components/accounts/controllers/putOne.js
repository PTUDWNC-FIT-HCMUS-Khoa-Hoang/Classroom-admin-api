import Roles from '../../../constants/role';
import accountServices from '../services';

const putOne = async (req, res) => {
  const accountId = req.params.id;

  try {
    const foundAccount = await accountServices.getOneById(accountId);

    if (foundAccount.role.title === Roles.superadmin) {
      throw new Error('You are not allowed to update super admin account');
    }

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
