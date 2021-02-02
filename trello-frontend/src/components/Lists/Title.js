import React, { useState } from "react";
import { Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const useStyles = makeStyles(theme => ({
    editableTitleContainer: {
        display: 'flex',
        marginLeft: theme.spacing(1),
        alignItems: 'center'
    },
    editableTitle: {
        flexGrow: '1'
    },
    input: {
        margin: theme.spacing(1),
        "&:focus": {
            backgroundColor: '#ddd'
        }
    }
}))


const Title = ({title}) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    return (
        <div>
            {open ? (
                <div>
                    <InputBase value={title}
                    autoFocus
                    inputProps ={{
                        className: classes.input
                    }}
                    fullWidth
                    onBlur = {()=>setOpen(!open)} />
                </div>
            ) : (
                    <div className={classes.editableTitleContainer}>

                        <Typography className={classes.editableTitle}
                        onClick={() => setOpen(!open)}>{title}</Typography>

                        <MoreHorizIcon />
                    </div>
                )}
        </div>
    );
};

export default Title;
