import "./Header.css";
import notify from "../../assets/images/notify.png";
import avatar from "../../assets/images/avatar.jpg"
import { useEffect, useState } from "react";
import User from "../../controller/user/userController";

const Header = () =>{
    const [userData, setUserData] = useState({});
    const [showOptions, setShowOptions] = useState(false);
    const handleShowOptions = () =>{
        setShowOptions(!showOptions);
    }

    //PROTOTYPE HERE
    const optionPanel = <div className="options__panel">
                                      <div className="option__item" >Help</div>
                                        <div className="option__item" >Language: EN 🇺🇸</div>
                                     <div className="option__item" >Logout</div>
                                        </div> 

    //--------------------------------------------

    useEffect(()=>{
        try{
        const user = new User();
        const id = localStorage.getItem('user-id');
        const fetchAPI = async () =>{
            const data = await user.getUser(id);
            setUserData({...data});
        }
        fetchAPI();
    }catch(error){
        console.log(error);
    }
    },[]);

    
    return  <div className="header">
            <div className="header__info">
            <div className="notify__img"><img src={notify} alt="notify" /></div>
            <div className="user__info">
                <div className="user__name">{userData.name}</div>
                <div className="user__img" onClick = {handleShowOptions}> <img src={userData.imgUrl} alt="userIMG" />                  </div>             
            </div>  
                {
                        showOptions ? optionPanel
                        : null
                }         
            </div>
        </div>

    
}

export default Header;