import { get, post } from "./axiosInstance";

export const createInternal = async (data) => {
  try {
    const ans = await post("internal-factor", data);
    return ans;
  } catch (error) {
    return error;
  }
};

const getInternals = async () => {
  try {
    let internals = await get("internal-factor");
    return internals;
  } catch (error) {
    return error;
  }
};

export const getInternalsArray = async () => {
  let ans = await getInternals();
  return [...new Set(ans.data.map((item) => item.command))];
};

export const getInternalDisplay = async () => {
  let internals = await getInternals();
  internals.data.push({ name: "אחר" });
  return internals;
};
