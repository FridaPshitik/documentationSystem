import { get, post } from "./axiosInstance";
const serverPath = process.env.REACT_APP_SERVER_PATH || "http://localhost:8000";

export const getExternals = async () => {
  try {
    return await get("external-factor");
  } catch (error) {
    return error;
  }
};

export const getExternalDisplay = (externalData) => {
  try {
    return [...externalData, { name: "אחר" }];
  } catch (error) {
    return error;
  }
};

export const getExternalsNameImage = (externalsData) => {
  try {
    let externals = externalsData.map((obj) => {
      return { name: obj.name, image: obj.image };
    });
    return externals;
  } catch (error) {
    return error;
  }
};

export const getExternalImag = (image) => {
  try {
    return `${serverPath}/external-factor/${image}`;
  } catch (error) {
    return error;
  }
};

export const createExternal = async (data) => {
  try {
    return await post("external-factor", data);
  } catch (error) {
    return error;
  }
};
