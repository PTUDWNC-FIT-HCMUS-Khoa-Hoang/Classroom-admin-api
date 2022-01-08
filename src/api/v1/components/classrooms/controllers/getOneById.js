import Classroom from '../model';
import gradeDetailServices from '../../grade_detail/services';

const getOneById = async (req, res) => {
  const { id } = req.params;
  try {
    const classroom = await Classroom.findById(id).populate({ path: 'owner' });
    const rawGradeDetails = await gradeDetailServices.getByClassroomId(id);
    const gradeBoard = gradeDetailServices.fulfillGradeBoard(
      classroom,
      rawGradeDetails
    );

    if (!classroom) {
      throw new Error('Not found');
    }
    res.status(200).send({
      ...classroom._doc,
      gradeBoard,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getOneById;
