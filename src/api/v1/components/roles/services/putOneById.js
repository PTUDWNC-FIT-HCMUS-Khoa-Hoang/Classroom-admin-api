import Roles from '../../../constants/role';
import Role from '../model';
import roleValidations from '../validations';

const putOneById = async (roleId, roleData) => {
  const validation = await roleValidations.putOne.validate(roleData);

  const role = await Role.findById(roleId);
  if (role.title === Roles.superadmin) {
    throw new Error('Please do not change anything of super admin');
  }

  const updatedRole = await Role.findByIdAndUpdate(roleId, validation, {
    new: true,
  });
  return updatedRole;
};

export default putOneById;
