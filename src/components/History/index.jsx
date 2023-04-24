//import lib
import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import uuid from "react-uuid";

//import Controller
import Task from "../../controller/task/taskController";
import User from "../../controller/user/userController";

//import style
import './History.css'
import logo from '../../assets/images/splash.jpg'

const History = () =>{
    const [taskData, setTaskData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
    const [modal,setModal] = useState(false);
    const [job, setJob] = useState("mcp");
    const [jobID,setJobID] = useState();

    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 6,
        }
    });

    const task = new Task();

    const completeTask = async (id) =>{
        console.log(id);
        await task.deleteTask(id);
    }
    
const columns = [
    {
        title: 'Deadline',
        dataIndex: 'date',
        sorter: true,
        width: '10%',
        align: 'center'
    },
    {
        title: 'ID',
        dataIndex: 'id_user',
        sorter: true,
        width: '5%',
        align: 'center',
    },
    {
        title: 'User',
        dataIndex: 'user',
        sorter: true,
        render:(_,record)=>{
            if(record.user){
                return <div className="table__user__row">
                    <div className="table__user__img"><img src={record.user.imgUrl} alt="userimgUrl"/></div>
                    <div className="table__user__name">{record.user.name}</div>
                </div>
            }else{
                return <div className="table__user__row">
                    <div className="table__user__img"><img src={logo} alt="userimgUrl"/></div>
                    <div className="table__user__name">Anonymous</div>
                </div>
            }
        }
    },
    {
        title: "Type",
        dataIndex: 'role',
        align: 'center',
        render: (_,record) => {
            if(record.user)
            return <div>{record.user.role.charAt(0).toUpperCase() + record.user.role.slice(1)}</div>
        }
    },
    {
        title: 'Task Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
        align: 'center',
    },
    {
        title: 'MCP',
        dataIndex: 'mcp',
        sorter: true,
        width: '10%',
        align: 'center',
        render: (record) => {
            return <Button className="button_modal" onClick={()=>{
                setModal(true); 
                setJob(record);
                setJobID(record);
            }}>{record}</Button>
        },
    },
    {
        title: 'Vehicle',
        dataIndex: 'vehicle',
        sorter: true,
        width: '10%',
        align: 'center',
        render: (record) => {
            return <Button className="button_modal" onClick={()=>{
                setModal(true); 
                setJob(record);
                setJobID(record);
            }}>{record}</Button>
        },
    },
    {
        title: 'Status',
        dataIndex: 'action',
        render: (_,record)=>{
            return(
                <>
                    <CheckOutlined style={{color:"#783EFD", cursor:"pointer"}} onClick={()=>{completeTask(record.id)}}/>
                </>
            );
        },
        width: '5%',
        align: 'center'
    }
  ];

    useEffect(()=>{
        const fetch = async () =>{
            try{
                setLoading(true);
                const data = await task.getAllTask();
                setTaskData(data);
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

        const callUser = async () => {
            const user = new User();
            const data = await user.getAllUser();
            setUsers(data);
        }
        callUser();

    },[JSON.stringify(tableParams)]);

    const tempTaskData = [...taskData];
    tempTaskData.forEach(elementTask=>{
        users.forEach(elementUser=>{
            if(String(elementTask.id_user) === String(elementUser.id)){
                const user = {...elementUser};
                elementTask.user = user;
                return;
            }
        });
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) setTaskData([]);
    };

    const defaultFooter = () =>{
        return <span className="table__footer">{`Total: ${taskData.length}`}</span>
    };


    return (
        <div className="table">
            <div className="table__title">History</div>
            <div className="table__content">
            <Table 
                columns={columns}
                loading={loading}
                rowKey={()=>{uuid()}}
                pagination={tableParams.pagination}
                dataSource={taskData}
                rowClassName="table__row"
                size="large"
                onChange={handleTableChange}
                footer={defaultFooter}
            />
            </div>
            <Modal
                open={modal}
                onCancel={()=>{setModal(false)}}
                footer={<div className='modal__footer'>
                <Button className="modal__cancel" onClick={()=>{setModal(false)}}>Cancel</Button>
            </div>}
            >
            <div className="modal__title">{job === 'mcp' ? "MCP" : "Vehicle"}</div>
            <div className='line'></div>
            <div className="modal__task">{job === 'mcp' ? `ID: ${jobID}`: `ID: ${jobID}`}</div>
            <div className="modal__task__description">
            {
                job === 'mcp' ? <div className="modal__task">Address: TPHCM</div> : <div>
                <div className="modal__task">Weight(Tons): 140</div>
                <div className="modal__task">Capacity(Tons): 5</div>
                <div className="modal__task">Fuel Consumption(Litre): 10</div>
                </div>
            }
            </div>
            </Modal>
        </div>
    );
};

export default History;