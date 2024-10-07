import axios from "axios";

const serverPath = process.env.REACT_APP_SERVER_PATH || "http://localhost:8000"


export const get = async (tablePath) => {
    try {
        const answer = await axios.get(`${serverPath}/${tablePath}`)
        return answer;
    }
    catch (error) {
        return error;
    }
}

export const post = async (tablePath, data) => {
    try {
        const answer = await axios.post(`${serverPath}/${tablePath}`, data)
        return answer;
    }
    catch (error) {
        return error;
    }
}

export const del = async (tablePath, id) => {
    try {
        const answer = await axios.delete(`${serverPath}/${tablePath}/${id}`)
        return answer;
    }
    catch (error) {
        return error;
    }
}

export const put = async (tablePath, data) => {
    try {
        const answer = await axios.put(`${serverPath}/${tablePath}`, data)
        return answer;
    }
    catch (error) {
        return error;
    }
}