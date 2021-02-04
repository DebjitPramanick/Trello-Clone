import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Navbars = () => {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div>
            <Topbar setOpenMenu={setOpenMenu}/>
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        </div>
    )
}

export default Navbars
