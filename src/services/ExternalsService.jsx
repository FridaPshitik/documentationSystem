import { get, post } from "./axiosInstance";
const serverPath = process.env.REACT_APP_SERVER_PATH || "http://localhost:8000"


export const getExternals = async () => {
  try {
    let ans = await get("external-factor");
    const externals = ans.data.map(item => item.name);
    return externals;
  }
  catch (error) {
    return error;
  }
};

export const getExternalImag = (image) => {
  try {
    let ans = `${serverPath}/external-factor/${image}`;
    return ans;
  }
  catch (error) {
    return error;
  }
};

export const getExternalsDisplay = async () => {
  try {
    const externals = await get("external-factor");
    externals.push({ name: 'אחר' })
    return externals;
  }
  catch (error) {
    return error;
  }
};

export const createExternal = async (data) => {
  try {
    const ans = await post("external-factor", data);
    return ans;
  }
  catch (error) {
    return error;
  }
};
