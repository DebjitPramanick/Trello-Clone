import React from 'react'
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '300px',
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
        cursor: 'pointer'
    }
}))

const Card = ({ card, index }) => {

    const classes = useStyles()

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div
                ref={provided.innerRef} {...provided.dragHandleProps}
                {...provided.draggableProps}
                >
                    <Paper className={classes.card}>{card.title}</Paper>
                </div>
            )}

        </Draggable>
    )
}

export default Card
