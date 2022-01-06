import express from 'express';
import authMiddleware from '../../middlewares/auth';
import { functionalityList } from '../functionalities/start/loadPrototypes';
import accountControllers from './controllers';

const accountRouter = express.Router();

//======================== GET ========================
accountRouter.get(
  '/',
  authMiddleware(functionalityList.canReadAccounts),
  accountControllers.getAll
);
accountRouter.get(
  '/other/:id',
  authMiddleware(functionalityList.canReadAccounts),
  accountControllers.getOneById
);
//======================== POST ========================
accountRouter.post('/login', accountControllers.login);
accountRouter.post(
  '/add',
  authMiddleware(functionalityList.canCreateAccount),
  accountControllers.postOne
);
//======================== PUT ========================
accountRouter.put(
  '/:id',
  authMiddleware(functionalityList.canUpdateAccount),
  accountControllers.putOne
);
//======================== DELETE ========================
accountRouter.delete(
  '/:id',
  authMiddleware(functionalityList.canDeleteAccount),
  accountControllers.deleteOne
);

export default accountRouter;
