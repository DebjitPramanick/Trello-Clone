import React, { useState, useEffect, useContext } from 'react'
import { Drawer, IconButton } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import colors from '../../utils/Colors';
import { getImages } from '../../utils/ImageApi';

import StoredApi from '../../utils/StoredAPI'

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '400px',
        padding: theme.spacing(2, 2, 2, 2)
    },
    menu: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: '20px'
    },
    box: {
        width: '48%',
        height: '90px',
        backgroundColor: 'blue',
        borderRadius: '10px',
        cursor: 'pointer',
    },
    colorsContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: '20px'
    }
}))


const Sidebar = ({ openMenu, setOpenMenu }) => {

    const classes = useStyles();
    const [images, setImages] = useState([]);

    const { changeBG } = useContext(StoredApi)

    const getImageList = async () => {
        const imageList = await getImages();
        setImages(imageList);
    }

    useEffect(() => {
        getImageList();
    }, [])


    const sendBG = (bg) => {
        changeBG(bg);
    }


    return (
        <div>
            <Drawer open={openMenu} anchor='right'>
                <div className={classes.drawer}>
                    <IconButton onClick={() => setOpenMenu(false)}>
                        <KeyboardArrowRightIcon />
                    </IconButton>

                    <h4 style={{ color: 'grey' }}>Choose Color Background</h4>


                    <div className={classes.colorsContainer}>
                        {colors.map((color, index) => (
                            <div className={classes.box}
                                key={index}
                                style={{
                                    backgroundColor: `${color}`
                                }}
                                onClick={() => sendBG(color)}
                            ></div>
                        ))}
                    </div>

                    <h4 style={{ color: 'grey' }}>Choose Image Background</h4>

                    <div className={classes.menu}>

                        {images.map(image => (
                            <div className={classes.box}
                                style={{
                                    backgroundImage: `url(${image.thumb})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }}
                                onClick={() => sendBG(image.url)}
                            ></div>
                        ))}
                    </div>



                </div>

            </Drawer>
        </div>
    )
}

export default Sidebar
