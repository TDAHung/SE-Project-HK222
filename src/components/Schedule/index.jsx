import React, { useEffect, useState } from "react";
import { Badge, Calendar, Modal, Button, Typography, Tag } from "antd";

//import style
import "./Schedule.css";
import gas from "../../assets/images/gas-pump-solid.png";
import weight from "../../assets/images/weight-scale-solid.png";
import strength from "../../assets/images/hand-fist-solid.png";
import location from "../../assets/images/location-crosshairs-solid.png";

//import controller
import User from "../../controller/user/userController";
import Task from "../../controller/task/taskController";

const Schedule = () => {
  const [userData, setUserData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [modal, setModal] = useState(false);
  const [idTask, setIDTask] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const task = new Task();
      await task.getAllTask().then((res) => {
        console.log(JSON.parse(res));
        setTaskData(JSON.parse(res));
      });
    };
    fetch();
  }, []);

  const dateCellRender = (value) => {
    // const listData = getListData(value);
    const stringValue = value.format("YYYY-MM-DD");
    const listData = taskData.filter(({ date }) => date === stringValue);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item["_id"]["$oid"]}>
            <Badge
              onClick={() => {
                setModal(true);
                setIDTask(item["_id"]["$oid"]);
              }}
            >
              <div className="calendar__user">
                <div className="calendar__img">
                  <img src={item.user.avatar_URL} alt="" />
                </div>
                <div className="calendar__name" style={{ fontSize: "15px" }}>
                  {item.user.fullname}
                </div>
                
              </div>
              <div className="calendar__task">Task: {item.name}</div>
              <div className="calendar__role" style={{ fontSize: "15px" }}>
                  <Tag color={item.user.role === "Collector" ? "blue" : "gold"}>{item.user.role.toUpperCase()}</Tag>
                </div>
            </Badge>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="calendar">
      <Calendar dateCellRender={dateCellRender} />;
      <Modal
        open={modal}
        cancelText={null}
        closable={false}
        confirmLoading={true}
        footer={
          <div className="modal__footer">
            <Button
              className="modal__cancel"
              onClick={() => {
                setModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        }
        className="modal"
      >
        <div className="modal__task__description">
          <div className="modal__task" style={{fontSize: "20px"}}>ID Task: {idTask}</div>
          <div className="line"></div>
          {taskData.map((obj) => {
            if (obj["_id"]["$oid"] === idTask) {
              if (obj["user"]["role"] === "Collector") {
                return (
                  <div>
                    <div className="modal__task">
                      <Typography.Title level={5}>Task Name: </Typography.Title>
                      <Typography.Text>{obj["name"]}</Typography.Text>
                    </div>
                    <div className="modal__task">
                      <img src={location} alt="" />
                      <Typography.Title level={5}>Origin: </Typography.Title>
                      <Typography.Text>
                        {obj["origin"]["address"]}
                      </Typography.Text>
                    </div>
                    <div className="modal__task">
                      <img src={location} alt="" />
                      <Typography.Title level={5}>
                        Destination:{" "}
                      </Typography.Title>
                      <Typography.Text>
                        {obj["destination"]["address"]}
                      </Typography.Text>
                    </div>
                    <div className="modal__task">
                      <img src={weight} alt="" />
                      <Typography.Title level={5}>
                        Weight (Tons):{" "}
                      </Typography.Title>
                      <Typography.Text>
                        {obj["vehicle"]["weight"]}
                      </Typography.Text>
                    </div>
                    <div className="modal__task">
                      <img src={strength} alt="" />
                      <Typography.Title level={5}>
                        Capacity (Tons):{" "}
                      </Typography.Title>
                      <Typography.Text>
                        {obj["vehicle"]["capacity"]}
                      </Typography.Text>
                    </div>
                    <div className="modal__task">
                      <img src={gas} alt="" />
                      <Typography.Title level={5}>
                        Fuel (Litre):{" "}
                      </Typography.Title>
                      <Typography.Text>
                        {obj["vehicle"]["fuel"]}
                      </Typography.Text>
                    </div>
                  </div>
                );
              }else{
                return (
                    <div>
                      <div className="modal__task">
                        <Typography.Title level={5}>Task Name: </Typography.Title>
                        <Typography.Text>{obj["name"]}</Typography.Text>
                      </div>
                      <div className="modal__task">
                        <img src={location} alt="" />
                        <Typography.Title level={5}>MCP: </Typography.Title>
                        <Typography.Text>
                          {obj["mcp"]["address"]}
                        </Typography.Text>
                      </div>
                    </div>
                  );
              }
            }
          })}
        </div>
      </Modal>
    </div>
  );
};

export default Schedule;
