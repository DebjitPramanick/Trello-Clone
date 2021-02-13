import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import { makeStyles, fade } from "@material-ui/core/styles";
import Navbars from './components/NavBar/Navbars';


import StoredApi from './utils/StoredAPI'
import Loader from './components/Loader/Loader';
import Login from './components/Login/Login';
import axios from "./utils/Axios";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: "column",
    },
}))


const App = () => {
    const classes = useStyles();
    const trelloUser = JSON.parse(localStorage.getItem('DBUSER'));
    const [user, setUser] = useState(trelloUser)
    const [bg, setBg] = useState();
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        if(user){
          axios.get(`/user/bg/${user.email}`)
            .then(res => {
                setBg(res.data.background)
            })  
        }
    }, [])

    const changeBG = (url) => {
        setLoader(true);
        setBg(url);
        setTimeout(() => {
            setLoader(false)
        }, 3000)
    }



    return (
        <div>
            {!user ? <Login setUser={setUser} setBg={setBg} />
                : (
                    <StoredApi.Provider value={{ changeBG }}>

                        {loader && <Loader />}

                        {user ? (
                            <div className={classes.root}
                                style={{
                                    backgroundColor: `${bg}`,
                                    backgroundImage: `url(${bg})`,
                                }}
                            >
                                <Navbars />
                                <Home USER={user}/>
                            </div>

                        ) : (user && bg) ? (
                            <div className={classes.root}
                                style={{
                                    backgroundColor: `${bg}`,
                                    backgroundImage: `url(${bg})`,
                                }}
                            >
                                <Navbars />
                                <Home USER={user}/>
                            </div>
                        ) : (
                            <div className={classes.root}
                                style={{
                                    backgroundColor: "#ffffff",
                                    backgroundImage: "#ffffff",
                                }}
                            >
                                <Navbars />
                                <Home USER={user}/>
                            </div>
                        )}

                        
                    </StoredApi.Provider>
                )}






        </div>
    )
}

export default App
