import express from 'express';
import authMiddleware from '../../middlewares/auth';
import { functionalityList } from './start/loadPrototypes';
import functionalityControllers from './controllers';

const functionalityRouter = express.Router();

//======================== GET ========================
functionalityRouter.get(
  '/',
  authMiddleware(functionalityList.canReadFunctionalities),
  functionalityControllers.getAll
);
functionalityRouter.get(
  '/mine',
  authMiddleware(),
  functionalityControllers.getMine
);
//======================== POST ========================
//======================== PUT ========================
//======================== DELETE ========================

export default functionalityRouter;
