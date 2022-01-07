import Classroom from '../model';

const getOneById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const classroom = await Classroom.findById(id).populate({ path: 'owner' });
    if (!classroom) {
      throw new Error('Not found');
    }
    res.status(200).send(classroom);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export default getOneById;
