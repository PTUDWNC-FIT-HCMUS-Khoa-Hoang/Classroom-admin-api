import Roles from '../../../constants/role';
import Role from '../../roles/model';
import Account from '../model';
import accountValidations from '../validations';

const putOne = async (accountId, accountData) => {
  // Validate body
  const validation = await accountValidations.putOne.validate(accountData);

  // Update account
  // // Restriction 1: Can not upgrade to super admin role
  if (validation.role) {
    const updateRole = await Role.findById(validation.role);
    if (updateRole.title === Roles.superadmin) {
      throw new Error('Can not upgrade account to super admin role');
    }
  }
  // // Restriction 2: Can not update super admin account
  const isSuperAdminAccount = await Account.findById(accountId).populate({
    path: 'role',
  });
  if (isSuperAdminAccount.role.title === Roles.superadmin) {
    throw new Error('Can not update super admin account information');
  }

  const account = await Account.findByIdAndUpdate(accountId, validation, {
    new: true,
  });

  // update password if any
  if (validation.password) {
    account.password = validation.password;
    await account.save();
  }

  return account;
};

export default putOne;
