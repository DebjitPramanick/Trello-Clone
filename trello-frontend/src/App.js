import React, { useState } from 'react'
import Home from './components/Home'
import { makeStyles, fade } from "@material-ui/core/styles";
import Navbars from './components/NavBar/Navbars';


import StoredApi from './utils/StoredAPI'
import Loader from './components/Loader/Loader';
import Login from './components/Login/Login';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: "column"
    },
}))


const App = () => {

    const trelloUser = JSON.parse(localStorage.getItem('trelloUser'));
    const background = JSON.parse(localStorage.getItem('background'));

    const [user, setUser] = useState(trelloUser)


    const classes = useStyles();

    const [bg, setBg] = useState(background);
    const [loader, setLoader] = useState(false);


    const changeBG = (url) => {
        console.log(url)
        setLoader(true);
        setBg(url);
        setTimeout(() => {
            setLoader(false)
        }, 3000)

        localStorage.setItem('background',JSON.stringify(url))

    }


    return (


        <div>

            {!user ? <Login setUser={setUser}/>
            : (
                    <StoredApi.Provider value={{ changeBG }}>


                        {loader && <Loader />}

                        <div className={classes.root}
                            style={{
                                backgroundColor: `${bg}`,
                                backgroundImage: `url(${bg})`,
                            }}
                        >
                            <Navbars />
                            <Home />
                        </div>
                    </StoredApi.Provider>
            )}



            


        </div>
    )
}

export default App
