import { Outlet } from "react-router-dom";

import './New.css'

const New = () =>{
    return <div className="addUser">
        <Outlet />
    </div>
}

export default New;