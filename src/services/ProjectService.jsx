import { get, post } from "./axiosInstance";

export const getProjects = async () => {
    try {
        let getProject = await get("project");
        return getProject;
    }
    catch (error) {
        return error;
    }
};

export const getExternalFactor = async () => {
    // id, name, image
    try {
        const externals = await get("external-factor");
        externals.data.push({ name: 'אחר' })
        return externals;
    }
    catch (error) {
        return error;
    }
};

export const getInternalFactor = async () => {
    // command, communicationType, contact, department, name,
    try {
        let internals = await get("internal-factor");
        internals.data.push({ name: 'אחר' })
        return internals;
    }
    catch (error) {
        return error;
    }
};

export const createProject = async (data) => {
    try {
        return await post("project", data);
    }
    catch (error) {
        return error;
    }
};
