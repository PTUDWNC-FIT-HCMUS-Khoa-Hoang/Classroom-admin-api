import express from 'express';
import accountControllers from './controllers';
import authMiddleware from '../../middlewares/auth';
import Roles from '../../constants/role';

const accountRouter = express.Router();

//======================== GET ========================
accountRouter.get(
  '/other/:id',
  authMiddleware([Roles.admin]),
  accountControllers.getOneById
);
//======================== POST ========================
accountRouter.post('/login', accountControllers.login);
//======================== PUT ========================
accountRouter.put(
  '/:id',
  authMiddleware([Roles.admin]),
  accountControllers.putOne
);
//======================== DELETE ========================

export default accountRouter;
