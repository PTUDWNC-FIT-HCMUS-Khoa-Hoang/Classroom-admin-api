import User from '../model';
import userValidations from '../validations';

const putOne = async (userId, userData) => {
  // Validate body
  const validation = await userValidations.putOne.validate(userData);

  // Update user
  const user = await User.findByIdAndUpdate(userId, validation, { new: true });

  // update password if any
  if (validation.password) {
    user.password = validation.password;
    await user.save();
  }

  return user;
};

export default putOne;
