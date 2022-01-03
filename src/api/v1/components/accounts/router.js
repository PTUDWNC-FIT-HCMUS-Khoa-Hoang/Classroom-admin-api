import express from 'express';
import authMiddleware from '../../middlewares/auth';
import functionalityList from '../functionalities/constants/functionalityList';
import accountControllers from './controllers';

const accountRouter = express.Router();

//======================== GET ========================
accountRouter.get(
  '/other/:id',
  authMiddleware(functionalityList.canReadAccounts),
  accountControllers.getOneById
);
//======================== POST ========================
accountRouter.post('/login', accountControllers.login);
//======================== PUT ========================
accountRouter.put(
  '/:id',
  authMiddleware(functionalityList.canUpdateAccount),
  accountControllers.putOne
);
//======================== DELETE ========================

export default accountRouter;
