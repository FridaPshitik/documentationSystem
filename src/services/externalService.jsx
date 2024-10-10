import { get } from "./axiosInstance";

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
  return [...new Set(ans.data.map((item) => item.command))];
};

export const getExternalDisplay = async () => {
  let externals = await getExternals();
  externals.data.push({ name: "אחר" });
  return externals;
};
