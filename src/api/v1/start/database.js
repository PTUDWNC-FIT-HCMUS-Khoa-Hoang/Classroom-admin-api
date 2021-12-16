import startAdminAccount from '../components/accounts/start/startAdminAccount';
import connectMongoDB from '../database/mongoose';
import logger from '../log';

const startDatabase = async () => {
  try {
    await connectMongoDB();

    await startAdminAccount();
  } catch (error) {
    logger.log(`Error when starting database: ${error.message}`);
  }
};

export default startDatabase;
