import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import "react-pro-sidebar/dist/css/styles.css";
import "./dashboard.css"
import Topbar from "./global/Topbar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "./theme";
//import { HomeOutlined } from "@mui/icons-material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';//profile
import SettingsIcon from '@mui/icons-material/Settings';
import { MenuOutlined } from "@mui/icons-material";
import { pages } from "../../utils/constants";


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title} 
            style={{color: colors.grey[100]}}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography variant="h4">{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    )
}



const DashboardLayout = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');
    

    return (
        
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: "#2E0C7E !important",
                    height: "100% !important"
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#00d2d3 !important",
                },
                "& .pro-menu-item.active": {
                    color: "#00d2d3 !important",
                }
            }}
        >
            {/* <Topbar /> */}
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square" className="sideBar">
                    {/* LOGO and Menu Icon */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlined /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: "#FFF",
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color="#FFFFFF">
                                    ADMIN
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlined/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/images/splash.jpg`}
                                    style={{ cursor: "pointer", borderRadius: "50%"}}
                                />
                            </Box>

                            <Box textAlign="center">
                                <Typography variant="h2" fontWeight="bold" sx={{ m: "10px 0 0 0" }} color={colors.grey[100]}>Hung Tran</Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>Leader</Typography>
                            </Box>
                        </Box>
                    )}
                    {/* Menu items side */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Typography
                            variant="h3"
                            color="#FFFFFF"
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            MAIN MENU
                        </Typography>
                        <Item
                            title="Assign Task"
                            to={pages.ASSIGN}
                            icon={<AssignmentIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="View History"
                            to={pages.HISTORY}
                            icon={<HistoryIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Chat"
                            to={pages.CHAT}
                            icon={<ChatIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h3"
                            color="#FFFFFF"
                            sx={{m: "15px 0 5px 20px"}}
                        >
                            OTHERS
                        </Typography>
                        <Item
                            title="Profile"
                            to={pages.PROFILE}
                            icon={<AccountBoxIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Settings"
                            to={pages.SETTING}
                            icon={<SettingsIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
            <Outlet/>
        </Box>
    )
}

export default DashboardLayout;