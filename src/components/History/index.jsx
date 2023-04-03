//import lib
import { Table } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import uuid from "react-uuid";

//import Controller
import Task from "../../controller/task/taskController";
import User from "../../controller/user/userController";

//import style
import './History.css'
import logo from '../../assets/images/splash.jpg'

const columns = [
    {
        title: 'Week',
        dataIndex: 'week',
        sorter: true,
        width: '5%',
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
                return <div className="table__user">
                    <div className="table__user__img"><img src={record.user.imgUrl??logo} alt="userimgUrl"/></div>
                    <div className="table__user__name">{record.user.name??"Anonymous"}</div>
                </div>
            }else{
                return <div className="table__user">
                    <div className="table__user__img"><img src={logo} alt="userimgUrl"/></div>
                    <div className="table__user__name">Anonymous</div>
                </div>
            }
        }
    },
    {
        title: 'MCP',
        dataIndex: 'mcp',
        sorter: true,
        width: '10%',
        align: 'center'
    },
    {
        title: 'Troller',
        dataIndex: 'troller',
        sorter: true,
        width: '10%',
        align: 'center'
    },
    {
        title: 'Route',
        dataIndex: 'route',
        sorter: true,
        width: '10%',
        align: 'center'
    },
    {
        title: 'Vehicle',
        dataIndex: 'vehicle',
        sorter: true,
        width: '10%',
        align: 'center'
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        render: (_,record)=>{
            return(
                <>
                    <CheckOutlined style={{color:"#783EFD", cursor:"pointer"}} onClick={()=>{console.log(record);}}/>
                </>
            );
        },
        width: '5%',
        align: 'center'
    }
  ];

const History = () =>{
    const [taskData, setTaskData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);

    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 10,
        }
    });

    const task = new Task();

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
        if (pagination.pageSize !== tableParams.pagination?.pageSize) setData([]);
    };

    return (
        <div className="table">
            <div className="table__title">History</div>
            <Table 
                columns={columns}
                loading={loading}
                rowKey={()=>{uuid()}}
                pagination={tableParams.pagination}
                dataSource={taskData}
                rowClassName="table__row"
                onChange={handleTableChange}
            />

        </div>
    );
};

export default History;