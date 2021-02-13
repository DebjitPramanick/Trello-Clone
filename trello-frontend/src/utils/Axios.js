import axios from 'axios'

const instance  = axios.create({
    baseURL: "https://trello-clone-2021.herokuapp.com/api"
})

export default instance