import jwt from 'jsonwebtoken';

const authMiddleware =
  (roles = []) =>
  async (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    try {
      // decode data from jwt
      const decodedObject = jwt.decode(token, process.env.JWT_SECRET);
      const decodedData = decodedObject.data;
      req.user = decodedData;

      // Check
      if (roles.length === 0) {
        return next();
      }
      // array || string
      if (typeof roles === 'string') {
        roles = [roles];
      }
      if (!roles.includes(req.user.role)) {
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
