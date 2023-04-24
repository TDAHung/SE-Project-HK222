//import lib
import { useState } from "react";
import { Form,Button, Input, Select, Space, Modal } from "antd";

//import user controller
import User from "../../../controller/user/userController";

import './User.css'

const defaultObject = {
    created_at: "",
    id: "",
    name: "",
    imgUrl: "",
    username: "",
    password: "",
    updated_at: "",
    role: "",
    status: "",
};

const typeRole = ["admin","collector","janitor"];

const NewUser = () => {
    const [submitUserData, setSubmitUserData] = useState({});
    const [modal,setModal] = useState(false);

    const user = new User();

    const onChange = (event) => {

        if(event.target){
            setSubmitUserData(prev=>({
                ...prev, [event.target.name]: event.target.value, 'status': true
            }));
        }else{
            setSubmitUserData(prev=>({
                ...prev, "role": event,  'status': true
            }));
        }
        console.log(submitUserData);
    }

    const onEdit = async () => {
        await user.addUser(submitUserData);
        setModal(true);
    }

    const formItems= [
        {
            label:"Name",
            name: "name",
        },
        {
            label: "Username",
            name: "username",
        },
        {
            label: "Password",
            name: "password",
        },
    ];

    const Items = formItems.map(element=>{
        return (
        <Form.Item label={element.label} key={element.name}>
            <Input type="text" className={`profile__${element.name}`} disabled={element.disable || false} name={element.name} onChange={event=>onChange(event)} value={element.value}/>
        </Form.Item>)
    });

    return <div className="form">
        <Form
            layout="vertical"
        >
            <div className="form__title">Add New Employee</div>
            {Items}
            <Space>
                <Select                             
                defaultValue="Select Role"
                style={{width: 150,    
                    color: '#783EFD',
                    fontFamily: 'Poppins'
                }}
                name="role"
                onChange={event=>{onChange(event)}}
                >
                    {
                            typeRole.map(item => <Option key={item}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Option>
                        )
                    }
                </Select>
            </Space>
            <Button className='profile__button' disabled={false} onClick={onEdit}>Create</Button>
        </Form>
        <Modal
            open={modal}
            onCancel={()=>{setModal(false)}}
            onOk={()=>{setModal(false)}}
        >
            Add Successfully
        </Modal>
    </div>
}

export default NewUser;