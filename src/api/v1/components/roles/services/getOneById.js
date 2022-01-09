import Role from '../model';

const getOneById = async (roleId) => {
  const role = await Role.findById(roleId);
  // const role = await Role.findById(roleId).populate({
  //   path: 'functionalityList',
  // });
  return role;
};

export default getOneById;
