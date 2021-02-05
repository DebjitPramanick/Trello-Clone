import React, { useState } from 'react'
import { Paper } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

import CancelIcon from '@material-ui/icons/Cancel';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '300px',
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
        cursor: 'pointer'
    },
    popupScreen: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '0',
        right: '0',
        left: '0',
        backgroundColor: fade('#000', 0.86),
    },
    popup: {
        width: '600px',
        height: '600px',
        borderRadius: '10px',
        backgroundColor: 'white',
        padding: theme.spacing(4),
        position: 'relative'
    },
    cancel: {
        cursor: 'pointer',
        position: 'absolute',
        right: '0',
        top: '0',
        margin: theme.spacing(4)
    }

}))

const Card = ({ card, index }) => {

    const classes = useStyles()

    const [popup, setPopup] = useState(false);

    const showDetails = (card) => {
        setPopup(true)
        console.log(card.title)
    }



    return (

        <div>

            { popup && (
                <div className={classes.popupScreen}>
                    <div className={classes.popup}>
                        <CancelIcon className={classes.cancel} onClick={() => setPopup(false)}/>
                        <h1>{card.title}</h1>
                    </div>
                </div>

            )}

            <Draggable draggableId={card.id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef} {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        onClick={() => showDetails(card)}
                    >
                        <Paper className={classes.card}>{card.title}</Paper>
                    </div>
                )}

            </Draggable>
        </div>
    )
}

export default Card
