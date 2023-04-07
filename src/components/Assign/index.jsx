//import style
import './Assign.css';
import arrow from "../../assets/images/arrow.png";

//import Components
import UserTable from './UserTable';
import TaskTable from './TaskTable';

//import lib
import { useState } from 'react';


const Assign = () =>{
    const [role, setRole] = useState("collector");
    const [date,setDate] = useState(1);

    const onClickRole = () => {
        if(role === 'collector') setRole('janitor');
        else setRole('collector');
    }

    return (
        <div className="assign">
            <div className="assign__header">
                <div className="assign__header__title">Assign Task</div>
                <div className="assign__option">
                    <div className="assign__week">
                        <div className="assign__week_img">
                            <img src={arrow} style={{"width": "1rem","rotate":"90deg", "cursor":"pointer"}} onClick={()=>{if(date > 0) setDate(date-1);}} alt="" />
                        </div>
                        {`Week: ${date}`}
                        <div className='assign__week_img'>
                            <img src={arrow} style={{"width": "1rem","rotate":"-90deg", "cursor":"pointer"}}onClick={()=>{setDate(date+1)}} alt="" />
                        </div>
                    </div>
                    <div className="assign__role" onClick={()=>{onClickRole()}}>{role === 'collector' ? 'Collector' : 'Janitor'}</div>
                </div>
            </div>
            <div className="assign__table">
                <UserTable role={role}/>
                <TaskTable date={date}/>
            </div>
        </div>
    );
};

export default Assign;