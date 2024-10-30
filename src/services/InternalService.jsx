import { get, post } from './axiosInstance';
import { internalImage } from './consts';

export const createInternal = async (data) => {
  try {
    return await post('internal-factor', data);
  } catch (error) {
    return error;
  }
};

export const getInternals = async () => {
  try {
    return await get('internal-factor');
  } catch (error) {
    return error;
  }
};

export const getInternalsArray = (internalsData) => {
  try {
    return [...new Set(internalsData.map((item) => item.command))];
  } catch (error) {
    return error;
  }
};

export const getInternalDisplay = (internalsData) => {
  try {
    return [...internalsData,{ command: 'אחר' }];
  } catch (error) {
    return error;
  }
};

export const getInternalsNameImage = (internalsData) => {
  try {
    let internals = internalsData.map((obj) => {
      return { name: obj.command, image: internalImage };
    });
    return internals;
  } catch (error) {
    return error;
  }
};
