import axios from 'axios'

const instance  = axios.create({
    baseURL: "https://trello-be-3lx4.onrender.com/api"
})

export default instance