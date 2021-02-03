import React, { useState, useContext } from "react";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import StoredAPI from "../../utils/StoredAPI";


const useStyles = makeStyles(theme => ({
    editableTitleContainer: {
        maxWidth: '300px',
        display: 'flex',
        marginLeft: theme.spacing(1),
    },
    editableTitle: {
        flexGrow: '1',
        maxWidth: '300px',
    },
    input: {
        maxWidth: '300px',
        margin: theme.spacing(1),
        "&:focus": {
            backgroundColor: '#ddd'
        }
    }
}))


const Title = ({title, listID}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const {updateListTitle} = useContext(StoredAPI);

    const [newTitle, setNewTitle] = useState(title)

    const handleOnBlur = () =>{
        updateListTitle(newTitle, listID)
        setOpen(!open);
    }

    return (
        <div>
            {open ? (
                <div>
                    <InputBase value={newTitle}
                    autoFocus
                    inputProps ={{
                        className: classes.input
                    }}
                    fullWidth
                    onChange={(e) => setNewTitle(e.target.value)}
                    onBlur = {handleOnBlur} />
                </div>
            ) : (
                    <div className={classes.editableTitleContainer}>

                        <Typography className={classes.editableTitle}
                        onClick={() => setOpen(!open)}>{newTitle}</Typography>

                        <MoreHorizIcon />
                    </div>
                )}
        </div>
    );
};

export default Title;
