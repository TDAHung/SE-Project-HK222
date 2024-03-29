//import lib
import { Table, Button, Form, Input, Modal, Select, Space } from 'antd';
import { useEffect, useState } from "react";
import uuid from 'react-uuid';

//import style
import "./UserTable.css";
import "../Assign.css";
import logo from "../../../assets/images/Logo.png";

//import Controller
import User from '../../../controller/user/userController';
import Vehicle from '../../../controller/vehicle/vehicleController';
import MCP from '../../../controller/mcp/mcpController';

const objectAssign = {
    id:'',
    mcp: '',
    vehicle: '',
};

const vehicle = new Vehicle();
const mcp = new MCP();

const UserTable = ({role}) => {
    const [userData, setUserData] =useState([]);
    const [dataFetch, setDataFetch] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [modal,setModal] = useState(false);
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
                            <div>{record.role.charAt(0).toUpperCase() + record.role.slice(1)}</div>
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
                            <div>{record.status?"Free":"Busy"}</div>
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

    const [mcpData, setMcpData] = useState([]);
    useEffect(() => {
        const fetch = async () =>{
            try{
                const data = await mcp.getAllMCP();
                setMcpData(data);
            }catch(error){
                console.log(error);
            }
        } 
        fetch();
    }, []);

    const [vehicleData, setVehicleData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            try{
                const data = await vehicle.getAllVehicle();
                setVehicleData(data);
            }catch(error){
                console.log(error);
            }
        }
        fetch();
    }, []);

    //call api to store
    const onAssign = () =>{
        setModal(false);
        console.log(assignData);
        setAssignData({...objectAssign});
    }


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
                    Assign for:
                    <Space>
                        <Select
                            defaultValue="Unassigned"
                            style={{width: 150}}
                        >
                            {
                                dataFetch.map((item) => <Option>{item.id}. {item.name}</Option>)
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
                                mcpData.map((item) => <Option key={item}>
                                        {item.id}.<br/>
                                        Start from: {item.startPoint}<br/>
                                        Go to: {item.destinationPoint}<br/>
                                        Status: {item.status}
                                    </Option>
                                )
                            }
                        </Select>                     
                    </Space>
                    <Space>
                        <Select
                            defaultValue="Vehicles"
                            style={{width: 470, marginTop: "2rem"}}
                        >
                            {
                                vehicleData.map((item) => <Option key= {item}>
                                        {item.id}.<br/>
                                        Weight: {item.weight}<br/>
                                        Capacity: {item.capacity}<br/>
                                        Fuel: {item.fuel}<br/>
                                        Status: {item.status}
                                    </Option>)
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