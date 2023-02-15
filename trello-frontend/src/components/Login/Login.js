import React, { useState, useEffect } from 'react'
import { makeStyles, fade } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import { auth, provider } from "../../utils/Firebase"
import axios from "../../utils/Axios"
import io from 'socket.io-client'

import { useStateValue } from '../../utils/Redux/StateProvider'
import { actionTypes } from '../../utils/Redux/Reducer'




const clientSocket = io('https://trello-be-3lx4.onrender.com');


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(https://www.teahub.io/photos/full/96-960665_desktop-wallpaper-laptop-mac-macbook-air-vk55-andro.jpg)',
        backgroundSize: 'cover'

    },
    loginBox: {
        fontFamily: 'Arial',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: fade('#000', 0.25),
        height: '260px',
        width: '260px',
        padding: theme.spacing(8),
        borderRadius: '8px'
    },
    btn: {
        backgroundColor: '#00bb7d',
        color: 'white',
        padding: theme.spacing(1, 1, 1, 1),
        marginTop: theme.spacing(4),
        fontSize: '14px',
        '&:hover': {
            backgroundColor: "#00bb8e"
        }
    },
    image: {
        width: '160px',
        height: '160px',
        marginBottom: theme.spacing(4)
    }

}))



const Login = ({ setUser, setBg }) => {

    clientSocket.on('connect', () => {
        console.log('Client connected.');
    });

    const [{ }, dispatch] = useStateValue();
    const [details, setDetails] = useState()
    const [data, setData] = useState({});
    const [registered, setRegistered] = useState(true)
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
                                photo: res.user.photoURL,
                                oldBG: response.data.background
                            }

                            setBg(userData.oldBG)

                            dispatch({
                                type: actionTypes.SET_USER,
                                user: userData,
                            })
                            setUser(userData)
                        }


                        else {
                            const dataObject = {
                                name: res.user.displayName,
                                email: res.user.email,
                                lists: [],
                                background: defaultUrl,
                                photo: res.user.photoURL
                            }
                            setData(dataObject);
                            setRegistered(false)
                        }
                    })
            })
            .catch((error) => alert(error.message))
    }

    const handleContinue = () => {

        axios.post("/upload/user", data);
        console.log("Uploaded user....no socket io")
        clientSocket.once('user-signed', (userData) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: userData,
            })
            setBg(userData.oldBG)
            setUser(userData)
        })

        
    }

    return (
        <div className={classes.root}>

            <div className={classes.loginBox}>
                <img src="https://cdn0.iconfinder.com/data/icons/navigation-elements-1/512/green-app-grid-menu-tile-choice-app-512.png" alt=""
                    className={classes.image} />
                <p style={{ color: 'white' }}>Welcome to Trello clone</p>

                {registered ? (
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
