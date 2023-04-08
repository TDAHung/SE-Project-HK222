//import style
import "./Test.css";

//import lib
import { Form,Button, Input } from "antd";
import { useEffect, useState } from "react";

//import controller
import User from "../../controller/user/userController";

//import components
import UserEdit from "./User";
import TaskEdit from "./Task";



const Test = () => {
    return <div className="test">
        <UserEdit />
        <TaskEdit />
    </div>
}

export default Test;