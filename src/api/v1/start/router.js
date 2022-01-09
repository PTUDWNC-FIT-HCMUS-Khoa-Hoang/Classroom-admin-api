import userRouter from '../components/users/router';
import accountRouter from '../components/accounts/router';
import roleRouter from '../components/roles/router';
import classroomRouter from '../components/classrooms/router';
import functionalityRouter from '../components/functionalities/router';

const api = 'api';

const startRouter = (app) => {
  app.use(`/${api}/users`, userRouter);
  app.use(`/${api}/accounts`, accountRouter);
  app.use(`/${api}/roles`, roleRouter);
  app.use(`/${api}/classrooms`, classroomRouter);
  app.use(`/${api}/functionalities`, functionalityRouter);

  //404
  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });
  //500 - Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      status: err.status || 500,
    });
  });
};

export default startRouter;
