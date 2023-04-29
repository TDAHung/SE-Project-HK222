//import lib
import { Table, Form, Tag } from "antd";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { Button, Modal, Input, Typography, DatePicker, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
//import Controller
import Task from "../../../controller/task/taskController";

//import style
import "./JanitorTable.css";
import "../Assign.css";
import MCP from "../../../controller/mcp/mcpController";
import User from "../../../controller/user/userController";

const defaultObject = {
  name: "",
  user: "",
  date: "",
  mcp: "",
};

const CollectorTable = ({ date }) => {
  const [taskAdd, setTaskAdd] = useState({ ...defaultObject });
  const [taskData, setTaskData] = useState([]);
  const [listMCP, setListMCP] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 6,
    },
  });
  const [form] = Form.useForm();

  const task = new Task();
  const mcp = new MCP();
  const employee = new User();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await task.getAllTask("janitor").then((res) => {
          setTaskData(JSON.parse(res));
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: 100,
            },
          });
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await mcp.getAllMCP().then((res) => {
          setListMCP(JSON.parse(res));
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await employee.getAllUser("free", "janitor").then((res) => {
          setListEmployee(JSON.parse(res));
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize)
      setTaskData([]);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: "30%",
      //   render: (object) => object.fullname,
    },
    {
      title: "Employee",
      dataIndex: "user",
      sorter: true,
      width: "20%",
      render: (object) => object.fullname,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      align: "center",
      render: (status) => {
        let color = status === "New" ? "green" : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "MCP",
      dataIndex: "mcp",
      sorter: true,
      width: "30%",
      render: (object) => {
        return (
          <Typography.Text ellipsis={true} style={{ width: "250px" }}>
            {object.address}
          </Typography.Text>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: true,
      width: "10%",
      align: "center",
    },
  ];

  const onChange = (event) => {
    setTaskAdd((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const formItems = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "User",
      name: "user",
    },
    {
      label: "MCP",
      name: "mcp",
    },
    {
      label: "Date",
      name: "date",
    },
  ];

  const formRender = formItems.map((element) => {
    const props_text = {
      type: "text",
      className: `task__${element.name}`,
      name: element.name,
      onChange: (event) => onChange(event),
      value: taskAdd[element.name],
    };
    const select_props = {
      style: {
        width: "100%",
        color: "#783EFD",
        fontFamily: "Poppins",
      },
      name: element.name,
    };
    let formItem;
    if (element.label === "Name") {
      formItem = <Input {...props_text} />;
    } else if (element.label === "Date") {
      formItem = (
        <DatePicker
          style={{ width: "50%" }}
          onChange={(_, dateString) => {
            setTaskAdd((prev) => ({
              ...prev,
              [element.name]: dateString,
            }));
          }}
        />
      );
    } else {
      let iterators;
      let options;
      if (element.label === "User") {
        iterators = listEmployee;
        options = "fullname";
      } else if (element.label === "MCP") {
        iterators = listMCP;
        options = "address";
      }
      formItem = (
        <Select
          {...select_props}
          onSelect={(value) => {
            setTaskAdd((prev) => ({
              ...prev,
              [element.name]: value,
            }));
          }}
        >
          {iterators.map((item) => (
            <Option key={item["_id"]["$oid"]} value={item["_id"]["$oid"]}>
              {item[options]}
            </Option>
          ))}
        </Select>
      );
    }
    return (
      <Form.Item label={element.label} key={element.name}>
        {formItem}
      </Form.Item>
    );
  });

  const defaultFooter = () => {
    return <span className="table__footer">{`Total: ${taskData.length}`}</span>;
  };

  const onSubmitTaskAdd = async () => {
    await task.addTask(taskAdd, "janitor").then((res) => {
      const updatedTask = [...taskData];
      updatedTask.push(res.data);
      setTaskData(updatedTask);
      setTaskAdd({ ...defaultObject });
      setModal(false);
    });
  };

  const footerTask = () => (
    <span className="table__footer">Total: {taskData.length}</span>
  );

  return (
    <div className="table">
      <div className="table__header">
        <div className="table__title">Task Janitor</div>
        <div className="table__add__task">
          <Button
            onClick={() => {
              setModal(true);
            }}
          >
            Create Task
          </Button>
        </div>
      </div>
      <div className="table__content">
        <Table
          columns={columns}
          loading={loading}
          rowKey={() => {
            uuid();
          }}
          pagination={tableParams.pagination}
          dataSource={taskData}
          rowClassName="table__row"
          size="large"
          onChange={handleTableChange}
          footer={defaultFooter}
        />
      </div>
      <Modal
        open={modal}
        cancelText={null}
        closable={false}
        confirmLoading={true}
        footer={
          <div className="modal__footer">
            <Button
              className="modal__assign"
              onClick={() => {
                form.submit();
              }}
            >
              Create
            </Button>
            <Button
              className="modal__cancel"
              onClick={() => {
                setModal(false);
                setTaskAdd({ ...defaultObject });
              }}
            >
              Cancel
            </Button>
          </div>
        }
        className="modal"
      >
        <Form form={form} onFinish={onSubmitTaskAdd}>
          {formRender}
        </Form>
      </Modal>
    </div>
  );
};

export default CollectorTable;
