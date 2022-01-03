import jwt from 'jsonwebtoken';
import Functionality from '../components/functionalities/model';
import Role from '../components/roles/model';

const authMiddleware = (functionality) => async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];

  try {
    // decode data from jwt
    const decodedObject = jwt.decode(token, process.env.JWT_SECRET);
    const decodedData = decodedObject.data;
    req.user = decodedData;

    // Check if account is valid
    if (decodedData.isDeleted) {
      throw new Error();
    }

    // Check role
    if (!functionality) {
      return next();
    }

    const role = await Role.findById(req.user.role);
    const func = await Functionality.findOne({
      title: functionality.title,
    });

    if (!role.functionalityList.includes(func._id)) {
      throw new Error();
    }

    return next();
  } catch (error) {
    const err = new Error('Access denied!');
    err.status = 401;
    return next(err);
  }
};

export default authMiddleware;
