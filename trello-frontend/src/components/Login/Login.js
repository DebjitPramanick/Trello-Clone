import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import { auth, provider } from "../../utils/Firebase"
import axios from "../../utils/Axios"

import { useStateValue } from '../../utils/Redux/StateProvider'
import { actionTypes } from '../../utils/Redux/Reducer'


import io from 'socket.io-client'


const socket = io.connect('http://localhost:3000');


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
    const [details, setDetails] = useState()
    const classes = useStyles();
    const defaultUrl = "https://i.pinimg.com/originals/47/0a/19/470a19a36904fe200610cc1f41eb00d9.jpg"



    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(res => {

                let email = res.user.email;

                axios.get(`/user/${email}`)
                    .then(response => {
                        if (email === response.data.email) {

                            const userData = {
                                _id: response.data._id,
                                name: response.data.name,
                                email: response.data.email,
                                photo: res.user.photoURL
                            }

                            dispatch({
                                type: actionTypes.SET_USER,
                                user: userData,
                            })
                            setUser(userData)
                        }


                        else {
                            const data = {
                                name: res.user.displayName,
                                email: res.user.email,
                                lists: [],
                                background: defaultUrl,
                                photo: res.user.photoURL
                            }

                            axios.post("/upload/user", data)
                            setDetails(true)
                            socket.once('user-registered', newData => {
                                console.log(newData)
                            })
                            
                        }
                    })
            })
            .catch((error) => alert(error.message))
    }


    const handleContinue = () => {

        dispatch({
            type: actionTypes.SET_USER,
            user: details,
        })
        setUser(details)
    }

    return (
        <div className={classes.root}>

            <div className={classes.loginBox}>
                <img src="https://cdn1.iconfinder.com/data/icons/designer-skills/128/trello-512.png" alt=""
                    className={classes.image} />
                Welcome to Trello clone

                {!details ? (
                    <Button className={classes.btn}
                        onClick={signIn}>
                        Signin with Google
                    </Button>
                ) : (
                        <Button className={classes.btn}
                            onClick={handleContinue}>
                            Let's Start
                        </Button>
                    )}

            </div>
        </div>
    )
}

export default Login
