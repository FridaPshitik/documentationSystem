import { get, post } from "./axiosInstance";

export const getProjects = async () => {
  try {
    let getProject = await get("project");
    return getProject;
  } catch (error) {
    return error;
  }
};

export const createProject = async (data) => {
  try {
    return await post("project", data);
  } catch (error) {
    return error;
  }
};
