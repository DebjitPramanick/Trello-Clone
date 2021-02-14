import React, { useState, useContext } from "react";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StoredAPI from "../../utils/StoredAPI";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
    editableTitleContainer: {
        display: 'flex',
        marginLeft: theme.spacing(1),
    },
    editableTitle: {
        flexGrow: '1',
        maxWidth: '300px',
        fontWeight: '600'
    },
    input: {
        maxWidth: '300px',
        margin: theme.spacing(1),
        "&:focus": {
            backgroundColor: '#ddd'
        },
    },
}))


const Title = ({ title, index }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const { updateListTitle, removeList } = useContext(StoredAPI);

    const [newTitle, setNewTitle] = useState(title)

    const handleOnBlur = () => {
        if (newTitle.length>=3 && newTitle.length<=20) {
            updateListTitle(newTitle, index)
            setOpen(!open);
        }

        else {
            alert("Please enter title within 3 to 20 characters.")
        }
    }

    return (
        <div>
            {open ? (
                <div>
                    <InputBase value={newTitle}
                        autoFocus
                        inputProps={{
                            className: classes.input
                        }}
                        fullWidth
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={handleOnBlur} />
                </div>
            ) : (
                    <div className={classes.editableTitleContainer}>

                        <Typography className={classes.editableTitle}
                            onClick={() => setOpen(!open)}>{newTitle}</Typography>

                        <CancelIcon className='removeBtn'
                            onClick={() => removeList(index)} />
                    </div>
                )}
        </div>
    );
};

export default Title;
