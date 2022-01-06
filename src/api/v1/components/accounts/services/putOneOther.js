import Roles from '../../../constants/role';
import logger from '../../../log';
import Role from '../../roles/model';
import Account from '../model';
import accountValidations from '../validations';

const putOne = async (accountId, accountData) => {
  // Validate body
  const validation = await accountValidations.putOne.validate(accountData);
  const { isResetPassword } = validation;

  delete validation.isResetPassword;

  // Update account
  //// Restriction 1: Can not upgrade account to super admin role
  if (validation.role) {
    const newRole = await Role.findById(validation.role._id || validation.role);
    if (newRole.title === Roles.superadmin) {
      throw new Error('Can not upgrade account to super admin role');
    }
  }

  const account = await Account.findByIdAndUpdate(accountId, validation, {
    new: true,
  });

  // reset password if any to 123123
  if (isResetPassword) {
    account.password = '123123';
    await account.save();

    logger.log(`Reset password for ${account.email}.`);
  }

  return account;
};

export default putOne;
