import React from 'react'
import "./Headerbar.css"
import { Avatar, Button } from "@material-ui/core"
import { useStateValue } from '../../utils/Redux/StateProvider';
import { makeStyles } from "@material-ui/core/styles";


import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles(theme => ({
    topbar: {
        backgroundColor: 'transparent'
    },
    title: {
        flexGrow: 1,
    },
    btn: {
        color: 'white',
        backgroundColor: '#00bb7d',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0C2D48'
        },
        cursor: 'pointer',
        fontSize: '12px',
        height: '36px'
    }
}))


const Headerbar = ({ setOpenMenu }) => {

    const classes = useStyles();

    const [{ user }, dispatch] = useStateValue();


    const logOut = () =>{
        localStorage.removeItem('DBUSER');
        localStorage.removeItem('FIREBASEUSER'); 
        window.location.reload(true);
    }

    return (
        <div>
            <div className="bottom-bar">
                <button
                    onClick={logOut}>
                    <ExitToAppIcon />
                </button>

                <button
                    onClick={() => setOpenMenu(true)}>
                    <InsertPhotoIcon />
                </button>
            </div>
            <div className='headerContainer'>
                <div className="display">
                    <Avatar src={user.photo} />
                    <h3>{user.name} - Dashboard</h3>
                </div>


                <div className="btn-container">

                    <Button className={classes.btn}
                        onClick={logOut}>
                        <ExitToAppIcon />
                        Log Out
                    </Button>

                    <Button className={classes.btn}
                        onClick={() => setOpenMenu(true)}>
                        <InsertPhotoIcon />
                        Change Background
                    </Button>

                </div>
            </div>
        </div>
        
    )
}

export default Headerbar
