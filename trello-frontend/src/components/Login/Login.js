import React, { useState } from 'react'
import { makeStyles, fade } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import { auth, provider, firebaseDB } from "../../utils/Firebase"

import { useStateValue } from '../../utils/Redux/StateProvider'
import { actionTypes } from '../../utils/Redux/Reducer'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginBox: {
        fontFamily: 'Arial',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
        height: '260px',
        width: '260px',
        padding: theme.spacing(8),
        borderRadius: '8px'
    },
    btn: {
        backgroundColor: '#007FFF',
        color: 'white',
        padding: theme.spacing(1, 1, 1, 1),
        marginTop: theme.spacing(4),
        '&:hover': {
            backgroundColor: "#0D4F8B"
        }
    },
    image: {
        width: '200px',
        height: '200px'
    }

}))



const Login = ({ setUser }) => {


    const [{ }, dispatch] = useStateValue();
    const classes = useStyles();

    const ref = firebaseDB.child('users')


    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(res => {
                const data = {
                    name: res.user.displayName,
                    email: res.user.email,
                }
                dispatch({
                    type: actionTypes.SET_USER,
                    user: res.user,
                })
                setUser(true);
            })
            .catch((error) => alert(error.message))
    }

    return (
        <div className={classes.root}>
            <div className={classes.loginBox}>
                <img src="https://cdn1.iconfinder.com/data/icons/designer-skills/128/trello-512.png" alt=""
                    className={classes.image} />
                Welcome to Trello clone
                <Button className={classes.btn}
                    onClick={signIn}>
                    Signin with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
