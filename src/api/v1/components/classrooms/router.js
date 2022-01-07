import express from 'express';
import authMiddleware from '../../middlewares/auth';
import functionalityList from '../functionalities/constants/functionalityList';
import classroomControllers from './controllers';

const classroomRouter = express.Router();

//======================== GET ========================
classroomRouter.get(
  '/',
  authMiddleware(functionalityList.canReadClassrooms),
  classroomControllers.getAll
);
classroomRouter.get(
  '/:id',
  authMiddleware(functionalityList.canReadClassrooms),
  classroomControllers.getOneById
);
//======================== POST ========================

//======================== PUT ========================

//======================== DELETE ========================

export default classroomRouter;
