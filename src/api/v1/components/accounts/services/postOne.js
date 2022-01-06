import logger from '../../../log';
import sendMailByGmail from '../../mails/services/gmail';
import generateRandomPassword from '../helpers/generateRandomPassword';
import Account from '../model';
import accountValidations from '../validations';
import checkAvailability from './checkAvailability';

const postOne = async (accountData) => {
  const validation = await accountValidations.postOne.validate(accountData);

  const accountInformation = {
    ...validation,
    password: generateRandomPassword(),
  };

  await checkAvailability(accountInformation.email);

  const subject = '[HMSP] - Management account information';
  const html = `
    <h1>HMSP Management Account</h1>
    <strong>Please do not provide this information to anyone else.</strong>
    <h3>Email: ${accountInformation.email}</h3>
    <h3>Password: ${accountInformation.password}</h3>
  `;

  const newAccount = new Account(accountInformation);

  await newAccount.save();

  sendMailByGmail({
    html,
    subject,
    receiverEmail: accountInformation.email,
  })
    .then(() =>
      logger.log(`Email is already sent to ${accountInformation.email}.`)
    )
    .catch((error) =>
      logger.log(
        `An error occurred while creating management account: ${error.message}`
      )
    );

  return newAccount;
};

export default postOne;
