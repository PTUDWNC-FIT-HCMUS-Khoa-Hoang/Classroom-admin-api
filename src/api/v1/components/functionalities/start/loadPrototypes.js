import Functionality from '../model';
import logger from '../../../log';
import functionalityList from '../constants/functionalityList';

let NextAvailableAppKey = 0;

const registerFunctionality = (strFunctionalityName) => {
  const newFunctionality = {
    title: strFunctionalityName,
    appKey: NextAvailableAppKey++,
  };
  functionalityList[strFunctionalityName] = newFunctionality;

  Functionality.findOne({ appKey: NextAvailableAppKey - 1 }, (err, func) => {
    if (func) {
      func.title = newFunctionality.title;
      func.save();
    } else {
      const newFunc = new Functionality(newFunctionality);
      newFunc.save();
    }
  });
};

const loadAllFunctionalities = async () => {
  try {
    const strFunctionalityNames = Object.keys(functionalityList);
    await Promise.all(
      strFunctionalityNames.map(async (strFuncName) => {
        const func = await Functionality.findOne({
          title: functionalityList[strFuncName].title,
        });
        if (!func) {
          const newFunc = new Functionality(functionalityList[strFuncName]);
          await newFunc.save();
        }
      })
    );
    logger.log('Done setting up functionalities');
  } catch (error) {
    logger.log(error.message);
  }
};

export { functionalityList, registerFunctionality, loadAllFunctionalities };
