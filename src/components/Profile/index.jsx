//import lib
import { Button, Form, Input, Modal } from 'antd'
import React from 'react';
import { useEffect, useState } from 'react';

//import style
import './Profile.css';

//import Controller
import User from '../../controller/user/userController';

const Profile = () => {

    const [userData, setUserData] = useState({});
    const [isEdit,setIsEdit] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);

    const user = new User();

    useEffect(()=>{
        const data =JSON.parse(localStorage.getItem('user'));
        setUserData({...data});
    },[]);

    const getCurrentDate = (separator='-') => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

    const onEdit = async () => {
        if(isEdit){
            await user.updateUser(userData.id,userData);
            const updatedUser = await user.getUser(userData.id);
            localStorage.setItem('user',JSON.stringify(updatedUser));
            setIsSuccess(true);
            setIsEdit(false);
        }else{
            setIsEdit(true);
        }
    }

    const onChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setUserData(prev=>({
            ...prev, [name]: value, updated_at:getCurrentDate()
        }));
    }

    const formItems = [
        {
            label:"Name",
            name: "name",
            value: userData.fullname
        },
        {
            label:"Username",
            name: "username",
            value: userData.username
        },
        {
            label:"Password",
            name: "password",
            value: userData.password
        }
    ];

    const Items = formItems.map(element=>{
        return (
        <Form.Item label={element.label} key={element.name}>
            <Input type="text" className={`profile__${element.name}`} name={element.name} onChange={event=>onChange(event)} value={element.value}/>
        </Form.Item>)
    });

    return (
        <div className="popup">
            <div className="profile__body">
              <div className="profile__img"> <img  src={userData.avatar_URL} alt="Profile"/></div> 
            <Form
                layout='vertical'
                disabled={!isEdit}
            >
                {Items}
                <Button className='profile__button' disabled={false} onClick={onEdit}>{isEdit?"Submit":"Edit"}</Button>
            </Form>
            </div>
            <Modal 
            open={isSuccess}
            onCancel={()=>{setIsSuccess(false)}}
            onOk={()=>{setIsSuccess(false)}}
            style={{color:"green"}}
            >
                Update Success
            </Modal>
        </div>
    );
};

export default Profile;
