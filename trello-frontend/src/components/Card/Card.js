import React, { useState, useContext } from 'react'
import { Paper, InputBase, Typography } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";

import CancelIcon from '@material-ui/icons/Cancel';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import StoredAPI from "../../utils/StoredAPI";

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
        cursor: 'not-allowed'
    },
    popup: {
        width: '600px',
        height: '600px',
        borderRadius: '10px',
        backgroundColor: 'white',
        padding: theme.spacing(4),
        position: 'relative',
        cursor: 'auto'
    },
    cancel: {
        cursor: 'pointer',
        position: 'absolute',
        right: '0',
        top: '0',
        margin: theme.spacing(4)
    },
    input: {
        maxWidth: '600px',
        height: 'fit-content',
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        "&:focus": {
            backgroundColor: '#ddd'
        },
    },
    editableTitle: {
        maxWidth: '600px',
        flexGrow: '1',
        color: 'grey',
        marginTop: theme.spacing(4)
    },

}))

const Card = ({ card, cardIndex, listIndex }) => {


    const { updateCardContent } = useContext(StoredAPI)
    const classes = useStyles()

    const [popup, setPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(card.content)

    const showDetails = (card) => {
        setPopup(true)
        console.log(card.title)
    }

    console.log(card.date)
    const handleOnDone = () => {
        updateCardContent(content, listIndex, cardIndex)
        setOpen(!open);
    }





    return (

        <div>

            { popup && (
                <div className={classes.popupScreen}>
                    <div className={classes.popup}>
                        <CancelIcon className={classes.cancel} onClick={() => setPopup(false)} />
                        <h1>{card.title}</h1>
                        <p>Card added - {card.date}</p>
                        {open ? (
                            <div>
                                <InputBase value={content}
                                    autoFocus
                                    inputProps={{
                                        className: classes.input
                                    }}
                                    fullWidth
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <button className="done-btn" onClick={handleOnDone}>Done</button>
                            </div>
                        ) : (
                                <div className={classes.editableTitleContainer}>

                                    <Typography className={classes.editableTitle}
                                        onClick={() => setOpen(!open)}>{content}</Typography>

                                </div>
                            )}
                    </div>
                </div>

            )}

            <Draggable draggableId={card._id} index={cardIndex}>
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
