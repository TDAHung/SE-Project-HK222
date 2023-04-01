import "./Header.css";
import notify from "../../assets/images/notify.png";
import avatar from "../../assets/images/avatar.jpg"
import { useEffect, useState } from "react";
import { userResponse } from "../../controller/Auth/user/userModel";

const Header = () =>{
    const [userData, setUserData] = useState();
    useEffect(()=>{
        const fetchData = async () =>{
            const result = await userResponse();
            setUserData(result);
        }
        fetchData();
    },[]);

    console.log(userData);
    return <div className="header">
        <div className="header__info">
            <div className="notify__img">
                <img src={notify} alt="notify" />
            </div>
            <div className="user__info">
                <div className="user__name">Tran Dinh Anh Hung</div>
                <div className="user__img">
                    <img src={avatar} alt="userIMG" />
                </div>
            </div>
        </div>
    </div>
}

export default Header;