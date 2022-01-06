import Roles from '../../../constants/role';
import Role from '../../roles/model';
import Account from '../model';
import accountValidations from '../validations';
import checkAvailability from './checkAvailability';

const postOne = async (accountData) => {
  const validation = await accountValidations.postOne.validate(accountData);

  await checkAvailability(validation.email);

  const role = await Role.findById(validation.role);
  if (role.title === Roles.superadmin) {
    throw new Error('Can not create another super admin');
  }

  const newAccount = new Account(validation);

  await newAccount.save();

  return newAccount;
};

export default postOne;
