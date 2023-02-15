import io from 'socket.io-client'
import axios from "../Axios"

const socket = io.connect('https://trello-clone-kohl-six.vercel.app/');

const updateCards = (id, data) => {
    axios.put(`/upload/card/${id}`, data)
    socket.once('user-updated', newData => {
        localStorage.setItem('DBUSER', JSON.stringify(newData))
    })
}

const updateLists = (id, data) => {
    axios.put(`/upload/list/${id}`, data)
    socket.once('user-updated', newData => {
        localStorage.setItem('DBUSER', JSON.stringify(newData))
    })
}


export {
    updateCards,
    updateLists
}