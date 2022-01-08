import express from 'express';
import authMiddleware from '../../middlewares/auth';
import gradeDetailMiddlewares from './middlewares';
import gradeDetailControllers from './controllers';
import functionalityList from '../functionalities/constants/functionalityList';

const gradeDetailRouter = express.Router();

// ======================== GET ========================
gradeDetailRouter.get(
  '/:classroomId',
  authMiddleware(functionalityList.canReadClassrooms),
  gradeDetailControllers.getByClassroomId
);
gradeDetailRouter.get(
  '/csv/:classroomId',
  authMiddleware(functionalityList.canReadClassrooms),
  gradeDetailControllers.getCsvDataByClassroomId
);
gradeDetailRouter.get(
  '/csv/:classroomId/:gradeId',
  authMiddleware(functionalityList.canReadClassrooms),
  gradeDetailControllers.getCsvDataByGradeId
);
// ======================== POST ========================
gradeDetailRouter.post(
  '/',
  authMiddleware(functionalityList.canReadClassrooms),
  gradeDetailControllers.postOne
);
gradeDetailRouter.post(
  '/csv/:classroomId/:gradeId',
  authMiddleware(functionalityList.canReadClassrooms),
  gradeDetailMiddlewares.uploadCsvFile,
  gradeDetailControllers.postCsvDataByGradeId
);
// ======================== PUT ========================
// ======================== DELETE ========================

export default gradeDetailRouter;
