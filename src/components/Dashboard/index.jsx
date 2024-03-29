//import libs
import { Outlet, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import "react-pro-sidebar/dist/css/styles.css";
import "./dashboard.css"
import { Box, IconButton, Typography, useTheme } from "@mui/material";

//import theme
import { tokens } from "./theme";

//import Icon from MUI lib
import ScheduleIcon from '@mui/icons-material/Schedule';
import MapIcon from '@mui/icons-material/Map';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';
import ChatIcon from '@mui/icons-material/Chat';
import AccountBoxIcon from '@mui/icons-material/AccountBox';//profile
import SettingsIcon from '@mui/icons-material/Settings';
import { MenuOutlined } from "@mui/icons-material";

//import constant
import { pages } from "../../utils/constants";

//import style
import Header from "../Header";
import logo from "../../assets//images/Logo.png";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title} 
            style={{color: colors.grey[900]}}
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
    const [userData, setUserData] = useState({});

    
    useEffect(()=>{
        const data =JSON.parse(localStorage.getItem('user'));
        setUserData({...data});
    },[]);

    return (
        <div className="dashboard">
        <Header />
        <Box
            className="dashboard__sidebar"
            sx={{
                "& .pro-sidebar-inner": {
                    background: "#2E0C7E !important",
                    height: "100% !important"
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "0.5rem 3.5rem 0.5rem 2rem !important",
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
                            margin: "1rem 0 2rem 0",
                            color: "#FFF",
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="1.5rem"
                            >
                                <Typography variant="h3" color="#FFFFFF">
                                    {String(userData.role).toUpperCase()}
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlined/>
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="2.5rem">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img  
                                    src={logo}
                                    style={{ cursor: "pointer", borderRadius: "50%", width: "20rem", height: "20rem"}}
                                />
                            </Box>

                            <Box textAlign="center">
                                <Typography variant="h2" fontWeight="bold" sx={{ m: "1rem 0 0 0" }} color={colors.grey[900]}>{userData.name}</Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>{userData.role}</Typography>
                            </Box>
                        </Box>
                    )}
                    {/* Menu items side */}
                    <Box>
                        <Typography
                            variant={isCollapsed ? "h4" : "h3"}
                            color="#FFFFFF"
                            sx={!isCollapsed ? {m: "1.5rem 0 0.5rem 2rem"}:{m:"1.5rem 0 0 1rem"}}
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
                        {
                            userData.role === 'admin' ? <Item
                            title="Add User"
                            to={`${pages.ADD}/${pages.USER}`}
                            icon={<MapIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                            /> : null
                        }
                        
                        {
                            userData.role === 'admin' ? <Item
                            title="Add MCP"
                            to={`${pages.ADD}/${pages.MCP}`}
                            icon={<MapIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                            /> : null
                        }

                        <Item
                            title="Schedule"
                            to={pages.SCHEDULE}
                            icon={<ScheduleIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant={isCollapsed ? "h4" : "h3"}
                            color="#FFFFFF"
                            sx={!isCollapsed ? {m: "1.5rem 0 0.5rem 2rem"}:{m:"1.5rem 0 0 0.3rem"}}
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
        </Box>
        <Outlet /> 
        </div>
    )
}

export default DashboardLayout;