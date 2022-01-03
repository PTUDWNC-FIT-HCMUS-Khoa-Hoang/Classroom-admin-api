import Roles from '../../../constants/role';
import logger from '../../../log';
import Functionality from '../../functionalities/model';
import Role from '../model';

const initializeRoles = async () => {
  const roles = Object.keys(Roles);

  await Promise.all(
    roles.map(async (role) => {
      const foundRole = await Role.findOne({
        title: role,
      });

      const funcList = [];
      if (role === Roles.superadmin) {
        const allFuncs = await Functionality.find({});
        allFuncs.forEach((func) => funcList.push(func._id));

        if (foundRole) {
          foundRole.functionalityList = funcList;
          await foundRole.save();
        }
      }

      if (!foundRole) {
        const newRole = new Role({
          title: role,
          functionalityList: funcList,
        });

        await newRole.save();
      }
    })
  );

  logger.log('Done setting up roles.');
};

export default initializeRoles;
