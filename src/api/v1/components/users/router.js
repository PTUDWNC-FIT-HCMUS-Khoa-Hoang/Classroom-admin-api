import express from 'express';
import authMiddleware from '../../middlewares/auth';
import functionalityList from '../functionalities/constants/functionalityList';
import userControllers from './controllers';

const userRouter = express.Router();

//======================== GET ========================
userRouter.get(
  '/',
  authMiddleware(functionalityList.canReadUsers),
  userControllers.getAll
);
userRouter.get(
  '/:id',
  authMiddleware(functionalityList.canReadUsers),
  userControllers.getOneById
);
//======================== POST ========================
userRouter.post(
  '/',
  authMiddleware(functionalityList.canCreateUser),
  userControllers.postOne
);
//======================== PUT ========================
userRouter.put(
  '/:id',
  authMiddleware(functionalityList.canUpdateUser),
  userControllers.putOne
);
//======================== DELETE ========================
userRouter.delete(
  '/:id',
  authMiddleware(functionalityList.canDeleteUser),
  userControllers.deleteOne
);

export default userRouter;
