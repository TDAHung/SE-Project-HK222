//import style
import "./Test.css";

//import components
import UserEdit from "./UserEdit";
import TaskEdit from "./TaskEdit";
import McpAdd from "./McpAdd";
import VehicleAdd from "./VehicleAdd";



const Test = () => {
    return <div className="test">
        <UserEdit />
        <TaskEdit />
        <McpAdd />
        <VehicleAdd />
    </div>
}

export default Test;