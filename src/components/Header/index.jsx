import "./Header.css";
import notify from "../../assets/images/notify.png";
import { useEffect, useState } from "react";

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
                }} >Logout</div>
        </div> 
    }

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        setUserData(user);    
    },[]);

    return  <div className="header">
            <div className="header__info">
            <div className="notify__img"><img src={notify} alt="notify" /></div>
            <div className="user__info">
                <div className="user__name">{userData.name}</div>
                <div className="user__img" onClick = {handleShowOptions}> <img src={userData.imgUrl} alt="userIMG" /> </div>             
            </div>  
                {showOptions ? optionPanel(): null}         
            </div>
        </div>
}

export default Header;