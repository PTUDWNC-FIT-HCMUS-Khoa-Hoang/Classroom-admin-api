import Account from '../model';

const getOneById = async (accountId) => {
  const account = await Account.findById(accountId).populate({ path: 'role' });

  return account;
};

export default getOneById;
