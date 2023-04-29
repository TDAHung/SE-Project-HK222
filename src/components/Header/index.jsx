import "./Header.css";
import notify from "../../assets/images/notify.png";
import { useEffect, useState, useContext } from "react";

//import theme
import { ColorModeContext, tokens } from "../Dashboard/theme";

//import MUI lib
import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";

const Header = () =>{
    const [userData, setUserData] = useState({});
    const [showOptions, setShowOptions] = useState(false);
    const handleShowOptions = () => setShowOptions(!showOptions);

    const optionPanel = () => { 
        return <div className="options__panel">
            <div className="option__item" >Help</div>
            <div className="option__item" >Language: EN 🇺🇸</div>
            <div className="option__item" onClick={()=>{
                sessionStorage.removeItem('onLogin');
                localStorage.removeItem('user');
                window.location.reload(false);
                }} >Logout</div>
        </div> 
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        setUserData(user);    
    },[]);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return  <div className="header">
            <div className="header__info">
            <IconButton     
                style={{
                    color: colors.grey[900],
                    marginRight: "1.5rem",
                    fontSize: "600"
                }}
                onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlined />
                ) : (
                    <LightModeOutlined />
                )}
            </IconButton>
            <div className="notify__img"><img src={notify} alt="notify" /></div>
            <div className="user__info">
                <div className="user__name">{userData.fullname}</div>
                <div className="user__img" onClick = {handleShowOptions}> <img src={userData.avatar_URL} alt="userIMG" /> </div>             
            </div>  
                {showOptions ? optionPanel(): null}         
            </div>
        </div>
}

export default Header;