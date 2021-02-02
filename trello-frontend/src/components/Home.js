import React, { useState } from 'react'
import List from "../components/Lists/List"
import store from "../utils/Data"
import StoredApi from "../utils/StoredAPI"
import { v4 as uuid } from 'uuid'
import InputConainer from './Input/InputConainer'
import { makeStyles } from "@material-ui/core/styles";
import { Paper, CssBaseline } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        backgroundImage: "url(https://i.pinimg.com/originals/47/0a/19/470a19a36904fe200610cc1f41eb00d9.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover"
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

    console.log(data)

    return (

        <StoredApi.Provider value={{ addMoreCard }}>
            <div className={classes.root}>

                {data.listIds.map(id => {
                    const list = data.lists[id]
                    return <List list={list} key={id} />
                })}

                <InputConainer type={'list'} />


            </div>
        </StoredApi.Provider>
    )
}

export default Home
