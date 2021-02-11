import React, { useState, useEffect } from 'react'
import List from "../components/Lists/List"
import store from "../utils/Data"
import StoredApi from "../utils/StoredAPI"
import { v4 as uuid } from 'uuid'
import InputConainer from './Input/InputConainer'
import { makeStyles } from "@material-ui/core/styles";

import axios from "../utils/Axios"

import { DragDropContext, Droppable} from "react-beautiful-dnd";


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
    const [user, setUser] = useState({});
    const [lists, setLists] = useState([])
    const [listIDs, setListIDs] = useState([])

    const email = JSON.parse(localStorage.getItem('trelloUser')).email;

    useEffect(()=>{
        axios.get(`/users/${email}`)
        .then(res => {
            setUser(res.data)
        })
    },[])

    if(user){
        localStorage.setItem("dbUser",JSON.stringify(user));
    }

    useEffect(() => {
        if(user){
            axios.get(`/users/lists/${email}`)
                .then(res => setLists(res.data))
        }
        
    }, [])

    const addMoreCard = (title, index) => {

        const newCardId = uuid();
        const date = new Date();
        
        const newCard = {
            id: newCardId,
            date: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`,
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
        setLists(allLists)

        console.log("Card List",allLists)

        const data = {lists : allLists};


        axios.put(`http://localhost:5000/api/upload/card/${user._id}`, data)
    }


    const updateListTitle = (title, index) => {
        const list = lists[index];
        list.title = title;
    }


    const addMoreList = (title) => {
        const newListId = uuid();
        const newList = {
            id: newListId,
            title: title,
            cards: []
        }

        const allLists = [...lists,newList];

        // List is an array

        setLists(list => [...list,newList])

        console.log("New Lists",allLists)

        const data ={lists: allLists}

        axios.put(`http://localhost:5000/api/upload/list/${user._id}`, data)
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        // if(type === 'list') {
        //     const newListIds = data.listIds;
        //     newListIds.splice(source.index,1);
        //     newListIds.splice(destination.index,0, draggableId);
        //     return;
        // }

        // const sourceList = data.lists[source.droppableId];
        // const destinationList = data.lists[destination.droppableId];
        // const draggingCard = sourceList.cards.filter(
        //     (card) => card.id === draggableId
        // )[0]

        // if (source.droppableId === destination.droppableId) {
        //     sourceList.cards.splice(source.index, 1);
        //     destinationList.cards.splice(destination.index, 0, draggingCard);

        //     const newState = {
        //         ...data,
        //         lists: {
        //             ...data.lists,
        //             [sourceList.id]: destinationList
        //         }
        //     }

        //     setLists(newState);
        // }

        // else {
        //     sourceList.cards.splice(source.index, 1);
        //     destinationList.cards.splice(destinationList.index, 0, draggingCard);

        //     const newState = {
        //         ...data,
        //         lists: {
        //             ...data.lists,
        //             [sourceList.id]: sourceList,
        //             [destinationList.id]: destinationList,
        //         }
        //     }

        //     setLists(newState)

        // }
    }

    return (

        <StoredApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
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
