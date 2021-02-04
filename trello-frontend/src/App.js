import React, {useState} from 'react'
import Home from './components/Home'
import { makeStyles } from "@material-ui/core/styles";
import Navbars from './components/NavBar/Navbars';


import StoredAPI from './utils/StoredAPI'

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
    }
}))


const App = () => {

    const classes = useStyles();

    const [bgImage, setBgImage] = useState('https://i.pinimg.com/originals/47/0a/19/470a19a36904fe200610cc1f41eb00d9.jpg');
    const [loader,setLoader] = useState(true);


    const changeBG = (url) => {
        setLoader(true);
    } 


    return (
        <div className={classes.root}
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <Navbars setBgImage={setBgImage}/>
            <Home />
        </div>
    )
}

export default App
