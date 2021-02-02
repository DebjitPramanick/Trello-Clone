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
        }
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1)
    }
}))


const InputCard = ({ setOpen, listID, type }) => {

    const classes = useStyles();
    const [title, setTitle] = useState();
    const { addMoreCard } = useContext(StoredAPI)

    const confirmAdd = () => {

        addMoreCard(title, listID);

        setOpen(false)
        setTitle('')
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
                <Button className={classes.btnConfirm}
                    onClick={confirmAdd}>
                    {type === 'card' ? 'Add Card' : 'Add List'}
                </Button>
                <IconButton>
                    <ClearIcon onClick={() => setOpen(false)} />
                </IconButton>
            </div>

        </div>
    )
}

export default InputCard
