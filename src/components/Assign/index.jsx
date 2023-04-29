//import style
import "./Assign.css";
import arrow from "../../assets/images/arrow.png";

//import Components
import CollectorTable from "./CollectorTable";
import JanitorTable from "./JanitorTable";

//import lib
import { useState } from "react";
import { Radio } from 'antd';

const Assign = () => {
  const [role, setRole] = useState("collector");

  return (
    <div className="assign">
      <Radio.Group defaultValue="collector" buttonStyle="solid" onChange={e => {
        console.log(e.target.value);
        setRole(e.target.value)
      }}>
        <Radio.Button value="collector">Collector</Radio.Button>
        <Radio.Button value="janitor">Janitor</Radio.Button>
      </Radio.Group>
      {role === 'collector' ? <CollectorTable/> : <JanitorTable/>}
    </div>
  );
};

export default Assign;
