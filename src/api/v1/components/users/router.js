import express from 'express';
import Roles from '../../constants/role';
import authMiddleware from '../../middlewares/auth';
import userControllers from './controllers';

const userRouter = express.Router();

//======================== GET ========================
userRouter.get('/', authMiddleware(Roles.admin), userControllers.getAll);
userRouter.get('/:id', authMiddleware(Roles.admin), userControllers.getOneById);
//======================== POST ========================
//======================== PUT ========================
userRouter.put('/:id', authMiddleware(Roles.admin), userControllers.putOne);
//======================== DELETE ========================
userRouter.delete(
  '/:id',
  authMiddleware(Roles.admin),
  userControllers.deleteOne
);

export default userRouter;
