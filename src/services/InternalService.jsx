import { get, post } from "./axiosInstance";
import { internalImage } from "./consts";

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
  try {
    let ans = await getInternals();
    return [...new Set(ans.data.map((item) => item.command))];
  } catch (error) {
    return error;
  }
};

export const getInternalDisplay = async () => {
  try {
    let internals = await getInternals();
    internals.data.push({ command: "אחר" });
    return internals;
  } catch (error) {
    return error;
  }
};

export const getInternalEdit = async () => {
  try {
    let internals = await getInternals();
    return internals;
  } catch (error) {
    return error;
  }
};

export const getInternalsNameImage = async () => {
  try {
    let ans = await getInternals();
    let internals = ans.data.map((obj) => {
      return { name: obj.command, image: internalImage };
    });
    return internals;
  } catch (error) {
    return error;
  }
};
