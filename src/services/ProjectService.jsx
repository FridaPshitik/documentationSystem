import { get, post } from "./axiosInstance";

export const getProjects = async () => {
  return await get("project");
};

export const getExternalFactor = async () => {
  // id, name, image
  const externals = await get("external-factor");
  externals.push({name:'אחר'})
  return externals;
};

export const getInternalFactor = async () => {
  // command, communicationType, contact, department, name,
  let internals = await get("internal-factor");
  internals.push({name:'אחר'})
  return internals;
};

export const createProject = async (data) => {
  return await post("project", data);
};
