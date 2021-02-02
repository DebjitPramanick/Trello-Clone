import React from 'react'
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(0, 1, 1, 1),
        paddingBottom: theme.spacing(4)
    },
    input: {
        margin: theme.spacing(1)
    },
    btnConfirm: {
        backgroundColor: '#145DA0',
        color: '#fff',
        '&:hover':{
            backgroundColor: '#0C2D48'
        }
    },
    confirm: {
        margin: theme.spacing(0,1,1,1)
    }
}))


const InputCard = ({setOpen}) => {

    const classes = useStyles();

    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase multiline fullWidth inputProps={{
                        className: classes.input
                    }} 
                    onBlur={() => setOpen(false)}
                    placeholder="Enter the title of the card"/>
                </Paper>
            </div>

            <div className={classes.confirm}>
                <Button className={classes.btnConfirm}
                onClick={()=>setOpen(false)}>Add Card</Button>
                <IconButton>
                    <ClearIcon onClick={() => setOpen(false)}/>
                </IconButton>
            </div>

        </div>
    )
}

export default InputCard
