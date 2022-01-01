import User from '../model';
import userValidations from '../validations';

const postOne = async (userData) => {
  const EXISTED_USER_ERROR = 'This email is already taken';
  userData.password = userData.password;

  const validation = await userValidations.postOne.validate(userData);

  const users = await User.find({
    email: validation.email,
  });

  const availableUser = users.find((user) => user.isDeleted === false);
  if (availableUser) {
    throw new Error(EXISTED_USER_ERROR);
  }

  const newUser = new User(validation);

  await newUser.save();
  return newUser;
};

export default postOne;
