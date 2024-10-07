import axios from "axios";

const serverPath = process.env.REACT_APP_SERVER_PATH || "http://localhost:2000"


export const get = async (tablePath) =>{ 
    const ans = await axios.get(`${serverPath}/${tablePath}`)
    return ans.data
}

export const post = async (data, tablePath) =>{      
    axios.post(`${serverPath}/${tablePath}`, data)
    .then(data => console.log(data.data))
    .catch(error => console.log(error)); 
}

export const postdelete = async (data, tablePath) =>{      
    axios.delete(`${serverPath}/${tablePath}`, data)//`${serverPath}/${tablePath}/{id}
    .then(data => console.log(data.data))
    .catch(error => console.log(error)); 
}

export const put = async (id, data, tablePath) =>{      
    console.log("id",id);
    axios.put(`${serverPath}/${tablePath}/${id}`, data)
    .then(data => console.log(data.data))
    .catch(error => console.log(error)); 
}