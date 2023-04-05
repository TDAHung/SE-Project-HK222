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
        title: 'Unassigned',
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
        }
    },
    ];

    const [taskData, setTaskData] = useState([]);
    const [userData, setUserData] =useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingTask, setLoadingTask] = useState(true);
    const [assignUserId, setAssignUserId] = useState();
    const [modal,setModal] = useState(false);

    const [tableUserParams, setTableUserParams] = useState({
        pagination: {
          current: 1,
          pageSize: 6,
        }
    });
    const [tableTaskParams, setTableTaskParams] = useState({
        pagination: {
          current: 1,
          pageSize: 6,
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
                setUserData(dataFetchTask);
                setTableUserParams({
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


    const handleTableChange = (pagination, filters, sorter) => {
        setTableUserParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) setUserData([]);
    };

    const defaultFooter = (data) =>{
        return <span className="table__footer">{`Total: ${data.length}`}</span>
    };


    return (
        <div className="assign">
            <div className="assign__header">
                <div className="assign__header__title">Assign Task</div>
                <div className="assign__option">
                    <div className="assign__week">Week 4</div>
                    <div className="assign__role">Collector</div>
                </div>
            </div>
            <div className="assign__table">
                <div className="assign__user__unassigned">
                    {/* <div className='unassigned__user__title'>Unassigned</div>
                    <div className='line'></div>
                    <div className="unassigned__user">
                        
                    </div> */}
                    <Table 
                        columns={columnsUser}
                        loading={loadingUser}
                        rowKey={()=>{uuid()}}
                        pagination={tableUserParams.pagination}
                        dataSource={userData}
                        rowClassName="table__row"
                        size="large"
                        onChange={handleTableChange}
                        footer={()=>{defaultFooter(userData)}}
                    />
                        <Modal 
                        open={modal}
                        onCancel={()=>{setModal(false)}}
                        onOk={()=>{setModal(false)}}
                        className="modal"
                        >
                            <Form>
                                
                            </Form>
                        </Modal>
                </div>
                <div className="assign__task__unassigned">
asdfasd
                </div>
            </div>
        </div>
    );
};

export default Assign;