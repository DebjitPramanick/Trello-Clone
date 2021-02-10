import React, { useState, useContext } from 'react'
import { Paper, InputBase, Button, IconButton } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from "@material-ui/core/styles";
import StoredAPI from '../../utils/StoredAPI';

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
        '&:hover': {
            backgroundColor: '#0C2D48'
        },
        cursor: 'pointer'
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1)
    }
}))


const InputCard = ({ setOpen, listID, index, type }) => {

    const classes = useStyles();
    const [title, setTitle] = useState();
    const { addMoreCard, addMoreList } = useContext(StoredAPI)

    const confirmAddCard = () => {
        if(title){
            addMoreCard(title, index);
            setOpen(false)
            setTitle('')
        }
    }



    const confirmAddList = () => {

        if(title){
            addMoreList(title);
            setOpen(false)
            setTitle('')
        }
        
    }



    return (
        <div>
            <div>
                <Paper className={classes.card}>
                    <InputBase multiline fullWidth inputProps={{
                        className: classes.input
                    }}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        onBlur={() => setOpen(false)}
                        placeholder={(type === "card") ? "Enter card title"
                            : "Enter list title"} />
                </Paper>
            </div>




            <div className={classes.confirm}>

                {type === 'card' ? (
                    <Button className={classes.btnConfirm}
                        onClick={confirmAddCard}>
                        Add Card
                    </Button>
                ) : (
                        <Button className={classes.btnConfirm}
                            onClick={confirmAddList}>
                            Add List
                        </Button>
                    )}


                <IconButton>
                    <ClearIcon onClick={() => setOpen(false)} />
                </IconButton>
            </div>

        </div>
    )
}

export default InputCard
