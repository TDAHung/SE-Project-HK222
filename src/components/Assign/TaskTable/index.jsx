


//import lib
import { Table } from 'antd';
import { useEffect, useState } from "react";
import uuid from 'react-uuid';
import { Button, Modal } from 'antd' 

//import Controller
import Task from '../../../controller/task/taskController';

//import style
import "./TaskTable.css";
import "../Assign.css";
import gas from "../../../assets/images/gas-pump-solid.png";
import weight from "../../../assets/images/weight-scale-solid.png";
import strength from "../../../assets/images/hand-fist-solid.png"
import location from "../../../assets/images/location-crosshairs-solid.png";

const TaskTable = ({date}) => {
    const [taskData, setTaskData] = useState([]);
    const [dataFetch, setDataFetch] = useState([]);
    const [loadingTask, setLoadingTask] = useState(true);
    const [modalTask,setModalTask] = useState(false);
    const [job,setJob] = useState('mcp');
    const [jobID,setJobID] = useState();
    const [tableTaskParams, setTableTaskParams] = useState({
        pagination: {
          current: 1,
          pageSize: 6,
        }
    });

    useEffect(()=>{
        const fetch = async () =>{
            try{
                const task = new Task();
                const dataFetchTask = await task.getAllTask();
                setDataFetch(dataFetchTask);
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

    useEffect(()=>{
        const dataAfterFilter = dataFetch.filter(element=>{
            const month = String(element.date).substring(String(element.date).indexOf('-')+1,String(element.date).lastIndexOf('-'));
            return Number(month) === Number(date);
        });
        setTaskData(dataAfterFilter);
    },[date]);

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

    const handleTableTaskChange = (pagination, filters, sorter) => {
        setTableTaskParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableTaskParams.pagination?.pageSize) setTaskData([]);
    };


    const columnsTask = [
        {
            title: <div className="assign__title">MCP's</div>,
            dataIndex: 'mcp',
            key: 'mcp',
            render: (_,record) => <Button name="mcp" className="assign__button" onClick={()=>{showDescriptionMCP(record)}}>{record.mcp}</Button>,
            align:'center',
        },
        {
            title: <div className="assign__title">Vehicle</div>,
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (_,record) => <Button name="vehicle" className="assign__button" onClick={()=>{showDescriptionVehicle(record)}}>{record.vehicle}</Button>,
            align:'center',
        }
    ];

    const footerTask = () => <span className="table__footer">Total: {taskData.length}</span>

    return(
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
            <div className="modal__title">{job === 'mcp' ? "MCP" : "Vehicle"}</div>
            <div className='line'></div>
            <div className="modal__task">{job === 'mcp' ? `ID: ${jobID}`: `ID: ${jobID}`}</div>
            <div className="modal__task__description">
            {
                job === 'mcp' ? <div className="modal__task">
                    <img src={location} alt="" />
                    Address: TPHCM
                </div> : <div>
                <div className="modal__task">
                    <img src={weight} alt="" />
                    Weight(Tons): 140
                </div>
                <div className="modal__task">
                    <img src={strength} alt="" />
                    Capacity(Tons): 5
                </div>
                <div className="modal__task">
                    <img src={gas} alt="" />
                    Fuel Consumption(Litre): 10</div>
                </div>
            }
                </div>
        </Modal>
    </div>
    );
}

export default TaskTable;