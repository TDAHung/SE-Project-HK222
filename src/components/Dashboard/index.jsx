import { Outlet } from "react-router-dom";

const DashboardLayout = () =>{
    return (
        <div>Dashboard
            <Outlet />
        </div>

    );
}

export default DashboardLayout;