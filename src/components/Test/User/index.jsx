//import lib
import { useState, useEffect } from "react";
import { Form,Button, Input } from "antd";

//import user controller
import User from "../../../controller/user/userController";


const UserEdit = () =>{
    const [userData, setUserData] = useState({});
    const [idInput, setID] = useState();
    const [submitID,setSubmitID] = useState("");


    const user = new User();
    useEffect(()=>{
        const fetch = async () =>{
            const data = await user.getUser(String(submitID));
            setUserData({...data});
        }
        fetch();
    },[submitID]);

    const onGetUser = () =>{
        setSubmitID(idInput);
    }

    const onChange = (event) => {
        setID(event.target.value);
        setUserData(prev=>({
            ...prev, [event.target.name]: event.target.value
        }));
    }

    const onEdit = async () => {
        console.log(userData);
        await user.updateUser(String(submitID),userData);
        console.log("edit user successfully");
    }

    const formItems = [
        {
            label: "id",
            name: "id",
        },
        {
            label:"Name",
            name: "name",
            value: userData.name,
            disable: "true",
        },
        {
            label: "role",
            name: "role",
            value: userData.role,
        }
    ];

    const Items = formItems.map(element=>{
        return (
        <Form.Item label={element.label} key={element.name}>
            <Input type="text" className={`profile__${element.name}`} disabled={element.disable || false} name={element.name} onChange={event=>onChange(event)} value={element.value}/>
        </Form.Item>)
    });

    return <div>
        <Form
            layout="vertical"
        >
            {Items}
            <Form.Item><Button onClick={onGetUser}>Get</Button></Form.Item>
            <Form.Item><Button onClick={onEdit}>Edit</Button></Form.Item>
        </Form>
    </div>
}

export default UserEdit;