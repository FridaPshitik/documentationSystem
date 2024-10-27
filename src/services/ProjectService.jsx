import { del, get, post, put } from "./axiosInstance";

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

export const deleteProject = async (id) => {
  try {
    return await del("project", id);
  } catch (error) {
    return error;
  }
};

export const updateProject = async (id, data) => {
  try {
    return await put("project", id, data);
  } catch (error) {
    return error;
  }
};
