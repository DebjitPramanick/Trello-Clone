import React, { useState } from 'react'
import Home from './components/Home'
import { makeStyles, fade } from "@material-ui/core/styles";
import Navbars from './components/NavBar/Navbars';
import CircularProgress from '@material-ui/core/CircularProgress';


import StoredApi from './utils/StoredAPI'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
    },
    loader: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        backgroundColor: fade('#000',0.86)
    }
}))


const App = () => {

    const classes = useStyles();

    const [bg, setBg] = useState('https://i.pinimg.com/originals/47/0a/19/470a19a36904fe200610cc1f41eb00d9.jpg');
    const [loader, setLoader] = useState(false);


    const changeBG = (url) => {
        console.log(url)
        setLoader(true);
        setBg(url);
        setTimeout(() => {
            setLoader(false)
        },3000)
        
    }


    return (
        <StoredApi.Provider value={{ changeBG }}>
            {loader && (
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
            )}
            <div className={classes.root}
                style={{
                    backgroundColor: `${bg}`,
                    backgroundImage: `url(${bg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}
            >
                <Navbars />
                <Home />
            </div>
        </StoredApi.Provider>
    )
}

export default App
