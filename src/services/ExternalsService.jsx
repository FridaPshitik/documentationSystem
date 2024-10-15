import { get, post } from "./axiosInstance";
const serverPath = process.env.REACT_APP_SERVER_PATH || "http://localhost:8000"

const getExternals = async () => {
  try {
    let externals = await get("external-factor");
    return externals;
  } catch (error) {
    return error;
  }
};

export const getExternalsArray = async () => {
  let ans = await getExternals();
  return [...new Set(ans.data.map((item) => item.name))];
};

export const getExternalDisplay = async () => {
  let externals = await getExternals();
  externals.data.push({ name: "אחר" });
  return externals;
};

export const getExternalsNameImage = async () => {
  let ans = await getExternals();
  let externals = ans.data.map((obj) => {
    return { name: obj.name, image: obj.image };
  });
  return externals;
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

export const createExternal = async (data) => {
  try {
    const ans = await post("external-factor", data);
    return ans;
  }
  catch (error) {
    return error;
  }
};
