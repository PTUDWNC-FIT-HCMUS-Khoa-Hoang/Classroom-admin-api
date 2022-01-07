import Account from '../model';
import Role from '../../roles/model';

const getOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findById(id);
    const role = await Role.findById(account.role);
    if (!account) {
      throw new Error('Not found');
    }
    res.status(200).send({
      ...account._doc,
      populatedRole: role,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getOneById;
