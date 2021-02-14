import React, {useState} from 'react'
import { Paper, Collapse, Typography } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import InputCard from './InputCard';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(1),
        minWidth: '300px',
        cursor: 'pointer'
    },
    addCard: {
        padding: theme.spacing(1, 1, 1, 1),
        margin: theme.spacing(0, 1, 1, 1),
        backgroundColor: '#EBECF0',
        '&:hover': {
            backgroundColor: "grey"
        }
    }
}))


const InputConainer = ({listID, index, type}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen} listID={listID} index={index} type={type}/>
            </Collapse>

            <Collapse in={!open}>
                <Paper className={classes.addCard} elevation={0}
                onClick={() => setOpen(!open)}>
                    <Typography>
                        {type==='card' ? '+ Add a card' : '+ Add another list'}
                    </Typography>
                </Paper>
            </Collapse>


        </div>
    )
}

export default InputConainer
