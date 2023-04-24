//import lib
import { useState, useEffect } from "react";
import { Form,Button, Input, Select, Space, Modal, Table } from "antd";
import uuid from "react-uuid";


//import user controller
import User from "../../../controller/user/userController";

import './User.css'

const defaultObject = {
    id: "",
    name: "",
    username: "",
    password: "",
    role: "",
    status: "",
};

const typeRole = ["admin","collector","janitor"];
const user = new User();

const NewUser = () => {
    const [submitUserData, setSubmitUserData] = useState({...defaultObject});
    const [userData,setUserData] = useState([]);
    const [modal,setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 7,
        }
    });

    useEffect(()=>{
        const fetch = async () =>{
            try{
                setLoading(true);
                const data = await user.getAllUser();
                setUserData(data);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 100
                    }
                });
            }catch(error){
                console.log(error);
            }
            setLoading(false);
        }
        fetch();
    },[modal]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            width: '5%'
        },
        {
            title: 'Avatar',
            dataIndex: 'imgUrl',
            render: (_,record) => {
                console.log(record);
                return <div><img style={{borderRadius: '50%'}} src={record.imgUrl} alt="" /></div>
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            width: '40%',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            width: '20%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            render:(_,record)=>{
                return <div>{record.status?"Free":"Busy"}</div>
            }
        },
    ];

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

    const onCreate = async () => {
        await user.addUser(submitUserData);
        setSubmitUserData({...defaultObject});
        setModal(false);
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

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) setUserData([]);
    };

    const Items = formItems.map(element=>{
        return (
        <Form.Item label={element.label} key={element.name}>
            <Input type="text" className={`profile__${element.name}`} name={element.name} onChange={event=>onChange(event)} value={submitUserData[element.name]}/>
        </Form.Item>)
    });

    const defaultFooter = () =>{
        return <span className="table__footer">{`Total: ${userData.length}`}</span>
    };

    return <div className="form">
        <div className="table">
        <div className="table__header">
            <div className="table__title">Employee</div>
            <div className="table__add__mcp"><Button onClick={()=>{setModal(true)}}>Create Employee</Button></div>
        </div>
        <div className="table__content">
        <Table 
            columns={columns}
            loading={loading}
            rowKey={()=>{uuid()}}
            pagination={tableParams.pagination}
            dataSource={userData}
            rowClassName="table__row"
            size="large"
            onChange={handleTableChange}
            footer={defaultFooter}
        />
        </div>
        <Modal
            open={modal}
            cancelText={null}
            closable={false}
            confirmLoading={true}
            footer={<div className='modal__footer'>
                <Button className="modal__assign" onClick={()=>{onCreate()}}>Create</Button>
                <Button className="modal__cancel" onClick={()=>{setModal(false)}}>Cancel</Button>
            </div>}
            className="modal"
        >
            <Form>
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
            </Form>
        </Modal>
        </div>
    </div>
}

export default NewUser;