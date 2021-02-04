import React, { useState } from 'react'
import List from "../components/Lists/List"
import store from "../utils/Data"
import StoredApi from "../utils/StoredAPI"
import { v4 as uuid } from 'uuid'
import InputConainer from './Input/InputConainer'
import { makeStyles } from "@material-ui/core/styles";

import { DragDropContext, Droppable} from "react-beautiful-dnd";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        maxWidth: '100vw',
        overflowX: 'scroll',
        minHeight: 'inherit',
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

    const [data, setData] = useState(store);


    const addMoreCard = (title, listId) => {
        const newCardId = uuid();
        const newCard = {
            id: newCardId,
            title: title,
        }

        const list = data.lists[listId];
        list.cards = [...list.cards, newCard]

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        }

        setData(newState)
    }


    const updateListTitle = (title, listID) => {
        const list = data.lists[listID];
        list.title = title;

        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listID]: list,
            },
        }

        setData(newState)
    }


    const addMoreList = (title) => {
        const newListId = uuid();
        const newList = {
            id: newListId,
            title: title,
            cards: []
        }

        const newState = {
            listIds: [
                ...data.listIds,
                newListId
            ],
            lists: {
                ...data.lists,
                [newListId]: newList
            }
        }

        setData(newState)
    }

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if(type === 'list') {
            const newListIds = data.listIds;
            newListIds.splice(source.index,1);
            newListIds.splice(destination.index,0, draggableId);
            return;
        }

        const sourceList = data.lists[source.droppableId];
        const destinationList = data.lists[destination.droppableId];
        const draggingCard = sourceList.cards.filter(
            (card) => card.id === draggableId
        )[0]

        if (source.droppableId === destination.droppableId) {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: destinationList
                }
            }

            setData(newState);
        }

        else {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destinationList.index, 0, draggingCard);

            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList,
                }
            }

            setData(newState)

        }
    }

    return (

        <StoredApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
            <DragDropContext onDragEnd={onDragEnd}>

                <Droppable droppableId='list' type='list' direction='horizontal'>

                    {(provided) => (

                        <div className={classes.root}
                            ref={provided.innerRef} {...provided.droppableProps}
                        >

                            {data.listIds.map((id,index) => {
                                const list = data.lists[id]
                                return <List list={list} key={id} index={index}/>
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
