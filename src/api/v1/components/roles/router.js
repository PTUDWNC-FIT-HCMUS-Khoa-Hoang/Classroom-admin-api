import express from 'express';
import authMiddleware from '../../middlewares/auth';
import { functionalityList } from '../functionalities/start/loadPrototypes';
import roleControllers from './controllers';

const roleRouter = express.Router();

//======================== GET ========================
roleRouter.get(
  '/',
  authMiddleware(functionalityList.canReadRoles),
  roleControllers.getAll
);
roleRouter.get(
  '/:id',
  authMiddleware(functionalityList.canReadRoles),
  roleControllers.getOne
);
//======================== POST ========================
//======================== PUT ========================
roleRouter.put(
  '/:id',
  authMiddleware(functionalityList.canUpdateRole),
  roleControllers.putOne
);
//======================== DELETE ========================

export default roleRouter;
