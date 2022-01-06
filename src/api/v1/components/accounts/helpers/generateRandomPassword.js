import generateUUID from '../../../helpers/generateUUID';

const generateRandomPassword = () => generateUUID(32);

export default generateRandomPassword;
