import React,{useState} from 'react'
import Headerbar from './Headerbar'
import Sidebar from './Sidebar'

const Navbars = () => {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div>
            <Headerbar setOpenMenu={setOpenMenu}/>
            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        </div>
    )
}

export default Navbars
