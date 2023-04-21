//import lib
import { Table, Button, Form, Input, Modal, Select, Space } from 'antd';
import { useEffect, useState } from "react";
import uuid from 'react-uuid';

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
                console.log(record);
                return <div className="table__user">
                    <div className='table__user__info'>
                        <div className="table__user__img"><img src={record.imgUrl||logo} alt="userimgUrl"/></div>
                        <div className="table__user__name">{record.name??"Anonymous"}</div>
                    </div>
                    {/* <Button className="assign__button" onClick={()=>{
                        setAssignUserId(record.id);
                        setModal(true);
                        console.log(assignData);
                    }}>Assign</Button>  */}
                </div>
            },
            align:'center'
        },
        {
            title: <div className='assign__title'>Role</div>,
            dataIndex:'role',
            key: 'role',
            render: (_, record) => {
                return (
                    <div className="table_user">
                        <div className='table__user__info'>
                            <div>{record.role??"Anonymous"}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            title: <div className='assign__title'>Status</div>,
            dataIndex:'status',
            key: 'status',
            render: (_, record) => {
                return (
                    <div className="table_user">
                        <div className='table__user__info'>
                            <div>{record.status??"Anonymous"}</div>
                        </div>
                    </div>
                )
            }
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
    // const formItems = [
    //     {
    //         name: 'mcp',
    //         label: 'MCP',
    //     },
    //     {
    //         name: 'vehicle',
    //         label: 'Vehicle',
    //     }
    // ];
    const [mcpData, setMcpData] = useState([]);
    useEffect(() => {
        fetch("https://6437eb53894c9029e8c9ce7b.mockapi.io/mcp").then((data)=>data.json()).then((item)=>setMcpData(item))
    }, []);

    const [vehicleData, setVehicleData] = useState([]);
    useEffect(() => {
        fetch("https://6437eb53894c9029e8c9ce7b.mockapi.io/vehicle").then((data) => data.json()).then((item)=>setVehicleData(item))
    }, []);
    
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
    
    // const renderForm = formItems.map(element=>{
    //     const props = {
    //         placeholder: `Enter your ${element.label} ID`,
    //         className: "assign__input__field",
    //         name: `${element.name}`
    //     };
    //     const rules = [{
    //         whitespace: false,
    //         required: true,
    //         message: `${element.label} can not be empty`
    //         }];
    
    //     return (
    //         // <Form.Item key={element.name} className="login__input"
    //         // name={element.name} label={element.label}
    //         // rules={rules}
    //         // >
    //         // <Input {...props} onChange={event=>{onChangeAssign(event)}} value={assignData[element.name]}/>
    //         // </Form.Item>
    //         <Space>
    //             <Select>
    //                 <Option value="lucy">Lucy</Option>
    //             </Select>
    //         </Space>
    //     )
    // });


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

        <Button className="assign__button" onClick={()=>{
            //setAssignUserId(record.id);
            setModal(true);
            console.log(assignData);
        }}>
            Assign
        </Button>

            <Modal 
            open={modal}
            cancelText={null}
            closable={false}
            confirmLoading={true}
            footer={null}
            className="modal"
            >   
                <div className="modal__title">
                    Assign for ID:
                    <Space>
                        <Select
                            defaultValue="Unassigned ID"
                            style={{width: 100}}
                        >
                            {
                                dataFetch.map((item) => <Option>{item.id}</Option>)
                            }
                        </Select>
                    </Space>
                </div>
                {/* <div className='line'></div> */}
                <Form layout='vertical'>
                    {/* {renderForm} */}
                    <Space>
                        <Select
                            defaultValue="MCP"
                            style={{width: 470, marginTop: "2rem"}}
                        >
                            {
                                mcpData.map((item) => <Option key={item}>{item.id}</Option>)
                            }
                        </Select>                     
                    </Space>
                    <Space>
                        <Select
                            defaultValue="Vehicles"
                            style={{width: 470, marginTop: "2rem"}}
                        >
                            {
                                vehicleData.map((item) => <Option key= {item}>{item.id}</Option>)
                            }
                        </Select>
                    </Space>
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