//import lib
import { Table } from 'antd';
import { useEffect, useState } from "react";
import uuid from 'react-uuid';
import { Button, Form, Input, Modal } from 'antd'

//import style
import "./UserTable.css";
import "../Assign.css";
import logo from "../../../assets/images/Logo.jpg";

//import Controller
import User from '../../../controller/user/userController';

const objectAssign = {
    id:'',
    mcp: '',
    vehicle: '',
};

const UserTable = ({role}) => {
    const [userData, setUserData] =useState([]);
    const [dataFetch, setDataFetch] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [modal,setModal] = useState(false);
    const [assignUserId, setAssignUserId] = useState();
    const [tableUserParams, setTableUserParams] = useState({
        pagination: {
          current: 1,
          pageSize: 6,
        }
    });
    const [assignData,setAssignData] = useState({...objectAssign}); 

    const columnsUser = [
        {
            title: <div className='assign__title'>Unassigned</div>,
            dataIndex: 'unassigned',
            key: 'unassigned',
            render: (_,record) => {
                return <div className="table__user">
                    <div className='table__user__info'>
                        <div className="table__user__img"><img src={record.imgUrl||logo} alt="userimgUrl"/></div>
                        <div className="table__user__name">{record.name??"Anonymous"}</div>
                    </div>
                    <Button className="assign__button" onClick={()=>{
                        setAssignUserId(record.id);
                        setModal(true);
                        console.log(assignData);
                    }}>Assign</Button>
                </div>
            },
            align:'center'
        },
    ];

    useEffect(()=>{
        const fetch = async () =>{
            try{
                const user = new User();
                const dataFetchUser = await user.getAllUser();
                setDataFetch(dataFetchUser);
                setTableUserParams({
                    ...tableUserParams,
                    pagination: {
                        ...tableUserParams.pagination,
                        total: 100
                    }
                });
            }catch(error){
                console.log(error);
            }
            setLoadingUser(false);
        } 
        fetch();
    },[JSON.stringify(tableUserParams)]);

    useEffect(()=>{
        const dataAfterFilter = dataFetch.filter(element=>{
            return role === element.role;
        });
        setUserData(dataAfterFilter);
    },[role]);

    const handleTableUserChange = (pagination, filters, sorter) => {
        setTableUserParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableUserParams.pagination?.pageSize) setUserData([]);
    };

    // formItems elements data
    const formItems = [
        {
            name: 'mcp',
            label: 'MCP',
        },
        {
            name: 'vehicle',
            label: 'Vehicle',
        }
    ];
    
     const onChangeAssign = event =>{
        const name = event.target.name;
        const value = event.target.value;
        setAssignData(prev=>({
        ...prev, [name]:value, id: assignUserId
        }));
    }

    //call api to store
    const onAssign = () =>{
        setModal(false);
        console.log(assignData);
        setAssignData({...objectAssign});
    }
    
    const renderForm = formItems.map(element=>{
        const props = {
            placeholder: `Enter your ${element.label} ID`,
            className: "assign__input__field",
            name: `${element.name}`
        };
        const rules = [{
            whitespace: false,
            required: true,
            message: `${element.label} can not be empty`
            }];
    
        return (
            <Form.Item key={element.name} className="login__input"
            name={element.name} label={element.label}
            rules={rules}
            >
            <Input {...props} onChange={event=>{onChangeAssign(event)}} value={assignData[element.name]}/>
            </Form.Item>
        )
    });

    const footerUser = () => <span className="table__footer">Total: {userData.length}</span>;

    return ( 
        <div className="assign__user__unassigned">
        <Table 
            columns={columnsUser}
            loading={loadingUser}
            rowKey={()=>{uuid()}}
            pagination={tableUserParams.pagination}
            dataSource={userData}
            rowClassName="table__row"
            size="large"
            onChange={handleTableUserChange}
            footer={footerUser}
        />
            <Modal 
            open={modal}
            cancelText={null}
            closable={false}
            confirmLoading={true}
            footer={null}
            className="modal"
            >   
                <div className="modal__title">{`Assign for ID: ${assignUserId}`}</div>
                <div className='line'></div>
                <Form layout='vertical'>
                    {renderForm}
                    <div className='modal__footer'>
                    <Form.Item><Button className="modal__cancel" onClick={()=>{setModal(false); setAssignData({...objectAssign})}} >Cancel</Button></Form.Item>
                    <Form.Item><Button className="modal__assign" onClick={()=>{onAssign()}}>Assign</Button></Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default UserTable;