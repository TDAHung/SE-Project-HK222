//import style
import './Assign.css';
import logo from '../../assets/images/splash.jpg'

//import lib
import { Table } from 'antd';
import { useEffect, useState } from "react";
import uuid from 'react-uuid';
import { Button, Form, Input, Modal } from 'antd'

//import Controller
import Task from "../../controller/task/taskController";
import User from "../../controller/user/userController";

const Assign = () =>{

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
                }}>Assign</Button>
            </div>
        },
        align:'center'
    },
    ];

    const showDescriptionMCP = (record) =>{
        setModalTask(true);
        setJob("mcp");
        setJobID(record.id);
    }

    const showDescriptionVehicle = (record) =>{
        setModalTask(true);
        setJob("vehicle");
        setJobID(record.id);
    }

    const columnsTask = [
        {
            title: <div className="assign__title">MCP's</div>,
            dataIndex: 'mcp',
            key: 'mcp',
            render: (_,record) => <Button name="mcp" onClick={()=>{showDescriptionMCP(record)}}>{record.mcp}</Button>,
            align:'center',
        },
        {
            title: <div className="assign__title">Vehicle</div>,
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (_,record) => <Button name="vehicle" onClick={()=>{showDescriptionVehicle(record)}}>{record.vehicle}</Button>,
            align:'center',
        }
    ];

    const [taskData, setTaskData] = useState([]);
    const [userData, setUserData] =useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingTask, setLoadingTask] = useState(true);
    const [assignUserId, setAssignUserId] = useState();
    const [modal,setModal] = useState(false);
    const [modalTask,setModalTask] = useState(false);
    const [job,setJob] = useState('mcp');
    const [jobID,setJobID] = useState();
    const [assignData,setAssignData] = useState({
        id:'',
        mcp: '',
        vehicle: '',
    }); 
    const [role, setRole] = useState("collector");

    const [tableUserParams, setTableUserParams] = useState({
        pagination: {
          current: 1,
          pageSize: 7,
        }
    });
    const [tableTaskParams, setTableTaskParams] = useState({
        pagination: {
          current: 1,
          pageSize: 7,
        }
    });

    useEffect(()=>{
        const fetch = async () =>{
            try{
                const user = new User();
                const dataFetchUser = await user.getAllUser();
                setUserData(dataFetchUser);
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
        const fetch = async () =>{
            try{
                const task = new Task();
                const dataFetchTask = await task.getAllTask();
                setTaskData(dataFetchTask);
                setTableTaskParams({
                    ...tableTaskParams,
                    pagination: {
                        ...tableTaskParams.pagination,
                        total: 100
                    }
                });
            }catch(error){
                console.log(error);
            }
            setLoadingTask(false);
        } 
        fetch();
    },[JSON.stringify(tableTaskParams)]);


    const handleTableUserChange = (pagination, filters, sorter) => {
        setTableUserParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableUserParams.pagination?.pageSize) setUserData([]);
    };

    const handleTableTaskChange = (pagination, filters, sorter) => {
        setTableTaskParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableTaskParams.pagination?.pageSize) setTaskData([]);
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
            <Input {...props} onChange={event=>{onChangeAssign(event)}}/>
          </Form.Item>
        )
    });

    //call api to store
    const onAssign = () =>{
        setModal(false);
    }

    const onClickRole = () => {
        if(role === 'collector') setRole('janitor');
        else setRole('collector');
    }

    const footerUser = () => <span className="table__footer">Total: {userData.length}</span>
    const footerTask = () => <span className="table__footer">Total: {taskData.length}</span>

    return (
        <div className="assign">
            <div className="assign__header">
                <div className="assign__header__title">Assign Task</div>
                <div className="assign__option">
                    <div className="assign__week">Week 4</div>
                    <div className="assign__role" onClick={()=>{onClickRole()}}>{role === 'collector' ? 'Collector' : 'Janitor'}</div>
                </div>
            </div>
            <div className="assign__table">
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
                        footer={<div className='modal__footer'>
                            <Button className="modal__cancel" onClick={()=>{setModal(false)}}>Cancel</Button>
                            <Button className="modal__assign" onClick={()=>{onAssign()}}>Assign</Button>
                        </div>}
                        className="modal"
                        >   
                            <div className="modal__title">{`Assign for ID: ${assignUserId}`}</div>
                            <div className='line'></div>
                            <Form layout='vertical'>
                                {renderForm}
                            </Form>
                        </Modal>
                </div>
                <div className="assign__task__unassigned">
                    <Table 
                        columns={columnsTask}
                        loading={loadingTask}
                        rowKey={()=>{uuid()}}
                        pagination={tableTaskParams.pagination}
                        dataSource={taskData}
                        rowClassName="table__row"
                        size="large"
                        onChange={handleTableTaskChange}
                        footer={footerTask}
                    />
                </div>
            </div>
            <Modal 
                 open={modalTask}
                 cancelText={null}
                 closable={false}
                 confirmLoading={true}
                 footer={<div className='modal__footer'>
                     <Button className="modal__cancel" onClick={()=>{setModalTask(false)}}>Cancel</Button>
                 </div>}
                 className="modal"
            >
                <div className="modal__task__id">{job === 'mcp' ? `MCP ID: ${jobID}`: `Vehicle ID: ${jobID}`}</div>
                <div className="modal__task__description">
                {
                    job === 'mcp' ? <div>Address: TPHCM</div> : <div>
                        <div>Weight</div>
                        <div>Capacity</div>
                        <div>Fuel Consumption</div>
                    </div>
                }
                </div>
            </Modal>
        </div>
    );
};

export default Assign;