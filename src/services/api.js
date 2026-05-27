import axios from 'axios'
//require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);



const api = axios.create({
    baseURL:'http://localhost:8001'
})

export default api