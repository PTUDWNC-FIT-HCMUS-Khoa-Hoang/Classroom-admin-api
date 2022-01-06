import Roles from '../../../constants/role';
import Account from '../model';

const deleteOne = async (accountId) => {
  const account = await Account.findById(accountId).populate({ path: 'role' });

  if (account.role.title === Roles.superadmin) {
    throw new Error('You can not delete super admin account!!!');
  }

  account.isDeleted = true;
  await account.save();

  return account;
};

export default deleteOne;
