import Account from '../model';

const checkAvailability = async (email) => {
  const accounts = await Account.find({ email });

  const existedAccount = accounts.find(
    (account) => account.isDeleted === false
  );

  if (existedAccount) {
    throw new Error('Email is not available');
  }
};

export default checkAvailability;
