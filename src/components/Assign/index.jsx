//import style
import './Assign.css';

//import Components
import UserTable from './UserTable';
import TaskTable from './TaskTable';

//import lib
import { useState } from 'react';


const Assign = () =>{

    const [role, setRole] = useState("collector");
    const onClickRole = () => {
        if(role === 'collector') setRole('janitor');
        else setRole('collector');
    }

    return (
        <div className="assign">
            <div className="assign__header">
                <div className="assign__header__title">Assign Task</div>
                <div className="assign__option">
                    <div className="assign__week">Week 4</div>
                    <div className="assign__role" onClick={()=>{onClickRole()}}>{role === 'collector' ? 'Collector' : 'Janitor'}</div>
                </div>
            </div>
            <div className="assign__table">
                <UserTable role={role}/>
                <TaskTable />
            </div>
        </div>
    );
};

export default Assign;