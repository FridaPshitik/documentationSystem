import { get, post } from "./axiosInstance";


export const getInternals = async () => {
  let ans = await get("internal-factor");
  const internals = ans.map(item => item.command);
  return internals;
};

export const getInternalDisplay = async () => {
  const internals = await get("internal-factor");
  internals.push({name:'אחר'})
  return internals;
};

export const createInternal = async (data) => {
  const ans = await post("internal-factor", data);
  return ans;
};
