import React from 'react'

import { Paper, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Title from './Title';
import Card from '../Card/Card';
import InputConainer from '../Input/InputConainer';


const useStyles = makeStyles(theme => ({
    root: {
        width: '300px',
        backgroundColor: '#EBECF0',
        marginLeft: theme.spacing(1)
    }
}))


const List = () => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.root}>
                <CssBaseline />
                <Title />
                <Card/>
                <Card />
                <Card />
                <Card />
                <Card />
                <InputConainer/>
            </Paper>
        </div>
    )
}

export default List
