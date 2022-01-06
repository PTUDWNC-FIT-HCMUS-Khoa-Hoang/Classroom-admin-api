import Roles from '../../../constants/role';
import logger from '../../../log';
import sendMailByGmail from '../../mails/services/gmail';
import Role from '../../roles/model';
import generateRandomPassword from '../helpers/generateRandomPassword';
import Account from '../model';
import accountValidations from '../validations';

const putOne = async (accountId, accountData) => {
  // Validate body
  const validation = await accountValidations.putOne.validate(accountData);
  const { isResetPassword } = validation;

  delete validation.isResetPassword;

  // Update account
  //// Restriction 1: Once deleted account can not be recovered
  const oldAccount = await Account.findById(accountId).populate({
    path: 'role',
  });
  if (oldAccount.isDeleted === true && validation.isDeleted === false) {
    throw new Error('Once deleted account can not be recovered');
  }
  //// Restriction 2: Can not upgrade account to super admin role
  const newRole = await Role.findById(validation.role);
  if (newRole.title === Roles.superadmin) {
    throw new Error('Can not upgrade account to super admin role');
  }

  const account = await Account.findByIdAndUpdate(accountId, validation, {
    new: true,
  });

  // reset password if any
  if (isResetPassword) {
    const newPassword = generateRandomPassword();

    const subject = '[HMSP] - Management account password changed';
    const html = `
      <h1>HMSP Management Account's New Password</h1>
      <strong>Please do not provide this information to anyone else.</strong>
      <h3>Email: ${account.email}</h3>
      <h3>Password: ${newPassword}</h3>
    `;

    account.password = newPassword;
    await account.save();

    await sendMailByGmail({
      receiverEmail: account.email,
      subject,
      html,
    });
    logger.log(`Email is already sent to ${account.email}.`);
  }

  return account;
};

export default putOne;
