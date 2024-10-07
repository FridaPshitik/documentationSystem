import { get, post } from "./axiosInstance";


export const getInternals = async () => {
  try {
    let ans = await get("internal-factor");
    const internals = ans.data.map(item => item.command);
    return internals;
  }
  catch (error) {
    return error;
  }
};

export const getInternalDisplay = async () => {
  try {
    const internals = await get("internal-factor");
    internals.push({ name: 'אחר' })
    return internals;
  }
  catch (error) {
    return error;
  }
};

export const createInternal = async (data) => {
  try {
    const ans = await post("internal-factor", data);
    return ans;
  }
  catch (error) {
    return error;
  }
};
