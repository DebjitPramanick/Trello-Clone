import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { AppBar,Toolbar,Button } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    topbar: {
        backgroundColor: 'transparent'
    },
    title: {
        flexGrow: 1,
    },
    btn: {
        color: 'white',
        backgroundColor: 'grey'
    }
}))



const Topbar = ({ setOpenMenu }) => {

    const classes = useStyles();

    return (
        <div>
            <AppBar position='static' className={classes.topbar} elevation={0}>
                <Toolbar>
                    <h1 className={classes.title}>Your Tasks</h1>
                    <Button className={classes.btn}
                    onClick={() => setOpenMenu(true)}>
                        Change Background
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Topbar
