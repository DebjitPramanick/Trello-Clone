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
        backgroundColor: '#145DA0',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0C2D48'
        },
        cursor: 'pointer',
        border: '1px solid white',
        fontSize: '12px',
        height: '36px'
    }
}))


const Headerbar = ({ setOpenMenu }) => {

    const classes = useStyles();

    const [{ user }, dispatch] = useStateValue();


    const logOut = () =>{
        localStorage.removeItem('trelloUser'); 
        window.location.reload(true);
    }

    return (
        <div className='headerContainer'>
            <div className="display">
                <Avatar src={user.photoURL} />
                <h3>{user.displayName} - Dashboard</h3>
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
    )
}

export default Headerbar
