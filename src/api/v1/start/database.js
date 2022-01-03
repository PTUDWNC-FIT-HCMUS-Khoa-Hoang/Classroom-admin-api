import startAdminAccount from '../components/accounts/start/startAdminAccount';
import connectMongoDB from '../database/mongoose';
import logger from '../log';
import { loadAllFunctionalities } from '../components/functionalities/start/loadPrototypes';
import startRoleComponent from '../components/roles/start';

const startDatabase = async () => {
  try {
    await connectMongoDB();

    await loadAllFunctionalities();
    await startRoleComponent();
    await startAdminAccount();
  } catch (error) {
    logger.log(`Error when starting database: ${error.message}`);
  }
};

export default startDatabase;
