import React, { useEffect, useState } from "react";
import { Badge, Calendar } from 'antd';

//import style
import "./Schedule.css";

//import controller
import User from "../../controller/user/userController";
import Task from "../../controller/task/taskController";

const Schedule = () =>{
    const [userData,setUserData] = useState([]);
    const [taskData,setTaskData] = useState([]);

    useEffect(()=>{
        const fetch = async () =>{
            const user = new User();
            const task = new Task();
            const dataTask = await task.getAllTask();
            const userData = await user.getAllUser();
            setUserData(userData);
            setTaskData(dataTask);
        }
        fetch();
    },[]);

    const tempTaskData = [...taskData];
    tempTaskData.forEach(elementTask=>{
        userData.forEach(elementUser=>{
            if(String(elementTask.id_user) === String(elementUser.id)){
                const user = {...elementUser};
                elementTask.user = user;
                return;
            }
        });
    });

    const getListData = (value) => {
        const deadline = taskData.filter(element=>{
            const day = String(element.date).substring(0,String(element.date).indexOf('-'));
            const month = String(element.date).substring(String(element.date).indexOf('-')+1,String(element.date).lastIndexOf('-'));
            const year = String(element.date).substring(String(element.date).lastIndexOf('-')+1,String(element.date).length);
            return value.month() + 1 === Number(month) && value.date() === Number(day) && value.year() === Number(year);
        });
        console.log(deadline);
        return deadline;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
        <ul className="events">
            {listData.map((item) => (
            <li key={item.id}>
                <Badge>
                    <div className="calendar__user">
                        <div className="calendar__img"><img src={item.user.imgUrl} alt="" /></div>
                        <div className="calendar__name">{item.user.name}</div>
                    </div>
                    <div className="calendar__task">Task: {item.name}</div>
                </Badge>
            </li>
            ))}
        </ul>
        );
    };

    return <div className="calendar">
        <Calendar 
            dateCellRender={dateCellRender}
        />;
    </div>
}

export default Schedule;