import Account from '../model';
import accountValidations from '../validations';

const putOne = async (accountId, accountData) => {
  // Validate body
  const validation = await accountValidations.putOne.validate(accountData);

  // Update account
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
