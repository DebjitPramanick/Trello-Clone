import React, { useState, useEffect } from 'react'
import List from "../components/Lists/List"
import store from "../utils/Data"
import StoredApi from "../utils/StoredAPI"
import { v4 as uuid } from 'uuid'
import InputConainer from './Input/InputConainer'
import { makeStyles } from "@material-ui/core/styles";

import axios from "../utils/Axios"

import { DragDropContext, Droppable} from "react-beautiful-dnd";

import io from 'socket.io-client'
import { updateCards, updateLists } from '../utils/Functions/allFunctions'

const socket = io('https://trello-be-3lx4.onrender.com/');


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        maxWidth: '100vw',
        overflowX: 'scroll',
        height: '100vh'
        },
    listbg: {
        width: '300px',
        backgroundColor: '#EBECF0',
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}))



const Home = () => {

    const classes = useStyles();
    const [lists, setLists] = useState([])
    const [listIDs, setListIDs] = useState([])

    const user = JSON.parse(localStorage.getItem('DBUSER'));

    useEffect(() => {
        axios.get(`/user/${user.email}`)
        .then(res => {
            setLists(res.data.lists)
        })
    }, [])

    const addMoreCard = (title, index) => {
        const date = new Date();
        
        const newCard = {
            date: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`,
            content: 'Add your content here..',
            title: title,
        }

        const reqList = lists[index];
        reqList.cards = [...reqList.cards, newCard]

        const modList = {
            ...reqList,
            cards: reqList.cards
        }

        const allLists = [...lists];
        allLists[index] = modList;
        axios.put(`/upload/card/${user._id}`, { lists: allLists })
        socket.once('list-updated', newData => {
            setLists(newData)
        })

    }

    const updateCardContent = (content, listIndex, cardIndex) => {

        lists[listIndex].cards[cardIndex].content = content;
        let allLists = [...lists];
        
        axios.put(`/upload/card/${user._id}`, { lists: allLists })
        socket.once('list-updated', newData => {
            setLists(newData)
        })
    }


    const removeCard = (listIndex, cardIndex) =>{
        const allCards = lists[listIndex].cards;
        allCards.splice(cardIndex,1);
        lists[listIndex].cards = allCards;
        const allLists = [...lists];
        axios.put(`/upload/list/${user._id}`, { lists: allLists })
        socket.once('list-updated', newData => {
            setLists(newData)
        })
    }


    const updateListTitle = (title, index) => {
        const list = lists[index];
        list.title = title;
        const allLists = [...lists];
        axios.put(`/upload/list/${user._id}`, { lists: allLists })
        socket.once('list-updated', newData => {
            setLists(newData)
        })
    }

    const removeList = (index) =>{
        const allLists = [...lists];
        allLists.splice(index,1);
        axios.put(`/upload/list/${user._id}`, { lists: allLists })
        socket.once('list-updated', newData => {
            setLists(newData)
        })
    }


    const addMoreList = (title) => {
        const newList = {
            title: title,
            cards: []
        }

        const allLists = [...lists,newList];
        axios.put(`/upload/list/${user._id}`, { lists: allLists })
        socket.once('list-updated', newData => {
            setLists(newData)
        })
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if(type === 'list') {

            const tempList = lists[source.index];
            lists[source.index] = lists[destination.index];
            lists[destination.index] = tempList;
            const allLists = [...lists]
            axios.put(`/upload/card/${user._id}`, { lists: allLists })
            socket.once('list-updated', newData => {
                setLists(newData)
            })
            return;
        }

        const destinationList = lists.find(obj => obj._id == destination.droppableId)
        const sourceList = lists.find(obj => obj._id == source.droppableId)
        const draggingCard = sourceList.cards.find(obj => obj._id == draggableId)

        if (source.droppableId === destination.droppableId) {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);

            const allLists = [...lists];
            axios.put(`/upload/card/${user._id}`, { lists: allLists })
            socket.once('list-updated', newData => {
                setLists(newData)
            })
        }

        else {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destinationList.index, 0, draggingCard);

            const allLists = [...lists];
            axios.put(`/upload/card/${user._id}`, { lists: allLists })
            socket.once('list-updated', newData => {
                setLists(newData)
            })
        }
    }

    return (

        <StoredApi.Provider value={{ addMoreCard, addMoreList, updateListTitle, removeList, 
            updateCardContent, removeCard }}>
            <DragDropContext onDragEnd={onDragEnd}>

                <Droppable droppableId='list' type='list' direction='horizontal'>

                    {(provided) => (

                        <div className={classes.root}
                            ref={provided.innerRef} {...provided.droppableProps}
                        >

                            {lists && lists.map((list,index) => {
                                return <List list={list} key={list._id} index={index}/>
                            })}

                            <InputConainer type={'list'} />
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>

            </DragDropContext>


        </StoredApi.Provider>
    )
}

export default Home
