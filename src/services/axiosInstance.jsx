import axios from "axios";

const serverPath = process.env.REACT_APP_SERVER_PATH || "http://localhost:8000"


export const get = async (tablePath) =>{ 
    const answer = await axios.get(`${serverPath}/${tablePath}`)
    return answer.data
}

export const post = async (tablePath, data) =>{
    const answer = await axios.post(`${serverPath}/${tablePath}`, data)
    return answer.data
}

export const del = async (tablePath, id) =>{      
    const answer = await axios.delete(`${serverPath}/${tablePath}/${id}`)
    return answer.data
}

export const put = async (tablePath, data) =>{      
    const answer = await axios.put(`${serverPath}/${tablePath}`, data)
    return answer.data
}
