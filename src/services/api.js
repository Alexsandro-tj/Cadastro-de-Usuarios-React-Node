import axios from 'axios'
//require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);



const api = axios.create({
    baseURL:'https://api-cadastro-de-usuarios-two.vercel.app/'
})

export default api