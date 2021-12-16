import Roles from '../../../constants/role';
import logger from '../../../log';
import Account from '../model';

const startAdminAccount = async () => {
  try {
    const adminInformation = {
      email: 'anhkhoatranle30@gmail.com',
      password: '123123',
      fullname: 'System Admin',
      isVerified: true,
      role: Roles.admin,
    };

    const foundAdminAccount = await Account.findOne({
      email: adminInformation.email,
    });
    if (!foundAdminAccount) {
      const adminAccount = new Account(adminInformation);
      await adminAccount.save();
    }

    logger.log('Successfully setup system admin account');
  } catch (error) {
    logger.log(
      `An error occurred while setting up admin account: ${error.message}`
    );
  }
};

export default startAdminAccount;
