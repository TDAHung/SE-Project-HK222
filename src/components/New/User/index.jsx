//import lib
import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Input,
  Select,
  Space,
  Modal,
  Table,
  DatePicker,
} from "antd";
import uuid from "react-uuid";
import sign from "jwt-encode";
//import user controller
import User from "../../../controller/user/userController";

import "./User.css";
import { SECRET } from "../../../utils/constants";

const defaultObject = {
  fullname: "",
  username: "",
  password: "",
  role: "",
  dob: "",
  address: "",
};

const typeRole = ["Back officer", "Collector", "Janitor"];
const addresses = ["TP.HCM", "Hà Nội", "Đà Nẵng", "Hải Phòng"];
const user = new User();

const NewUser = () => {
  const [submitUserData, setSubmitUserData] = useState({ ...defaultObject });
  const [userData, setUserData] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 7,
    },
  });
  const [form] = Form.useForm();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await user.getAllUser().then((res) => {
          setUserData(JSON.parse(res));
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

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar_URL",
      width: "5%",
      render: (imgUrl) => {
        return (
          <a href="https://imgbb.com/">
            <img src={imgUrl} alt="user" border="0"></img>
          </a>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      width: "30%",
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "20%",
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      width: "10%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "5%",
      align: "center",
      render: (status) => {
        return <div>{status === "free" ? "Free" : "Busy"}</div>;
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      width: "20%",
      align: "right",
    },
  ];

  const onChange = (event) => {
    console.log(event);
    console.log(event.target);
    if (event.target) {
      setSubmitUserData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    } else {
      setSubmitUserData((prev) => ({
        ...prev,
        role: event,
      }));
    }
  };

  const onCreate = async () => {
    // await user.addUser(submitUserData);
    // setSubmitUserData({...defaultObject});
    // setModal(false);
  };

  const formItems = [
    {
      label: "Full Name",
      name: "fullname",
    },
    {
      label: "Username",
      name: "username",
    },
    {
      label: "Password",
      name: "password",
    },
    {
      label: "Select Role",
      name: "role",
    },
    {
      label: "Address",
      name: "address",
    },
    {
      label: "Date of birth",
      name: "dob",
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize)
      setUserData([]);
  };

  const Items = formItems.map((element) => {
    let input;
    const props = {
      type: "text",
      className: `profile__${element.name}`,
      name: element.name,
      onChange: (event) => onChange(event),
      value: submitUserData[element.name],
    };
    const select_props = {
      style: {
        width: 150,
        color: "#783EFD",
        fontFamily: "Poppins",
      },
      name: element.name,
    };
    if (element.label === "Password") {
      input = <Input.Password {...props} />;
    } else if (element.label === "Select Role" || element.label === "Address") {
      let items = element.label === "Select Role" ? typeRole : addresses;
      input = (
        <Select
          {...select_props}
          onSelect={(value) => {
            setSubmitUserData((prev) => ({
              ...prev,
              [element.name]: value,
            }));
          }}
        >
          {items.map((item) => (
            <Option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Option>
          ))}
        </Select>
      );
    } else if (element.label === "Date of birth") {
      input = (
        <DatePicker
          onChange={(_, dateString) => {
            setSubmitUserData((prev) => ({
              ...prev,
              [element.name]: dateString,
            }));
          }}
        />
      );
    } else {
      input = <Input {...props} />;
    }
    return (
      <Form.Item label={element.label} key={element.name}>
        {input}
      </Form.Item>
    );
  });

  const onSubmitEmployee = async () => {
    submitUserData['password'] = sign({pwd: submitUserData['password']}, SECRET);
    await user.addUser(submitUserData).then(res => {
        const updatedEmployee = [...userData];
        updatedEmployee.push(res.data);
        setUserData(updatedEmployee);
        setSubmitUserData({...defaultObject});
        setModal(false);
    })
    .catch((err) => console.log(err));
  };

  const defaultFooter = () => {
    return <span className="table__footer">{`Total: ${userData.length}`}</span>;
  };

  return (
    <div className="form">
      <div className="table">
        <div className="table__header">
          <div className="table__title">Employee</div>
          <div className="table__add__mcp">
            <Button
              onClick={() => {
                setModal(true);
              }}
            >
              Create Employee
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
            dataSource={userData}
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
                }}
              >
                Cancel
              </Button>
            </div>
          }
          className="modal"
        >
          <Form
            onFinish={(event) => {
              onSubmitEmployee(event);
            }}
            form={form}
          >
            {Items}
            {/* <Button
                className="modal__assign"
                htmlType="submit"
                // onClick={() => {
                //   onCreate();
                // }}
              >
                Create
              </Button> */}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default NewUser;
