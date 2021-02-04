import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Navbars = ({setBgImage}) => {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div>
            <Topbar setOpenMenu={setOpenMenu}/>
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} setBgImage={setBgImage}/>
        </div>
    )
}

export default Navbars
