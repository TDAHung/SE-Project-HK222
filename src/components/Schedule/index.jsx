import React, { useEffect, useState } from "react";
import { Badge, Calendar, Modal, Button } from 'antd';

//import style
import "./Schedule.css";
import gas from "../../assets/images/gas-pump-solid.png";
import weight from "../../assets/images/weight-scale-solid.png";
import strength from "../../assets/images/hand-fist-solid.png"
import location from "../../assets/images/location-crosshairs-solid.png";

//import controller
import User from "../../controller/user/userController";
import Task from "../../controller/task/taskController";



const Schedule = () =>{
    const [userData,setUserData] = useState([]);
    const [taskData,setTaskData] = useState([]);
    const [modal,setModal] = useState(false);
    const [idTask, setIDTask] = useState("");

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
        return deadline;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
        <ul className="events">
            {listData.map((item) => (
            <li key={item.id}>
                <Badge onClick={()=>{setModal(true); setIDTask(item.id)}}>
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
        <Modal
            open={modal}
            cancelText={null}
            closable={false}
            confirmLoading={true}
            footer={<div className='modal__footer'>
                <Button className="modal__cancel" onClick={()=>{setModal(false)}}>Cancel</Button>
            </div>}
            className="modal"
        >
            <div className="modal__task__description">
                <div className="modal__task">ID Task: {idTask}</div>
                <div className="line"></div>
                <div className="modal__task">
                        <img src={location} alt="" />
                        Address: TPHCM
                </div>
                <div>
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
                        Fuel Consumption(Litre): 10
                    </div>
                </div>
            </div>
        </Modal>
    </div>
}

export default Schedule;