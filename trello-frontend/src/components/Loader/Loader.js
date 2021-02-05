import React from 'react'

import { makeStyles, fade } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({

    loader: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        backgroundColor: fade('#000', 0.86)
    }
}))


const Loader = () => {

    const classes = useStyles();

    return (
        <div className={classes.loader}>
            <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '10px',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <CircularProgress />
            </div>

        </div>
    )
}

export default Loader
