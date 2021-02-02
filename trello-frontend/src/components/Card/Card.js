import React from 'react'
import { Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    card: {
        padding: theme.spacing(1,1,1,2),
        margin: theme.spacing(1)
    }
}))

const Card = () => {
    
    const classes = useStyles()

    return (
        <div>
            <Paper className={classes.card}>This is a card</Paper>
        </div>
    )
}

export default Card
