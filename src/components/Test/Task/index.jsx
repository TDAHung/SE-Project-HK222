//import lib
import { useState, useEffect } from "react";
import { Form,Button, Input, DatePicker } from "antd";

//import user controller
import Task from "../../../controller/task/taskController";

const TaskEdit = () =>{
    const [taskData, setTaskData] = useState({});
    const [idInput, setID] = useState();
    const [submitID,setSubmitID] = useState();

    const task = new Task();
    useEffect(()=>{
        const fetch = async () =>{
            const data = await task.getTask(String(submitID));
            setTaskData({...data});
        }
        fetch();
    },[submitID]);


    const onGetTask = () =>{
        setSubmitID(idInput);
    }

    const onChange = (event) => {
        setID(event.target.value);
        setTaskData(prev=>({
            ...prev, [event.target.name]: event.target.value
        }));
    }

    const onChangeDate = (date) => {
        if(date){
            const day = date.$d.getDate();
            const month = date.$d.getMonth() + 1;
            const year = date.$y;
            const deadline = `${day}-${month<10?`0${month}`:`${month}`}-${year}`;
        setTaskData(prev=>({
            ...prev, date: deadline
        }));
        }
    }

    const onEdit = async () => {
        console.log(taskData);
        await task.updateTask(submitID,taskData);
        console.log("edit task successfully");
    }

    const formItems = [
        {
            label: "id",
            name: "id",
        },
        {
            label: "Name",
            name: "name",
            value: taskData.name,
        },
        {
            label:"MCP ID",
            name: "mcp",
            value: taskData.mcp,
        },
        {
            label:"Vehicle ID",
            name: "vehicle",
            value: taskData.vehicle,
        },
        {
            label:"User_Task ID",
            name: "id_user",
            value: taskData.id_user,
        }
    ];

    const Items = formItems.map(element=>{
        return (
        <Form.Item label={element.label} key={element.name}>
            <Input type="text" className={`profile__${element.name}`} name={element.name} onChange={event=>onChange(event)} value={element.value}/>
        </Form.Item>)
    });

    
    return <div>
        <Form
            layout="vertical"
        >
            {Items}
            <Form.Item label={"Deadline"} key="date">
                <DatePicker name="date" onChange={onChangeDate}/>
            </Form.Item>
            <Form.Item><Button onClick={onGetTask}>Get</Button></Form.Item>
            <Form.Item><Button onClick={onEdit}>Edit</Button></Form.Item>
        </Form>
    </div>
}

export default TaskEdit;
