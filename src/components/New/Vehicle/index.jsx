//import lib
import { useState, useEffect, useCallback } from "react";
import { Form, Button, Input, Table, Modal, Tag } from "antd";
import uuid from "react-uuid";

//import controller
import Vehicle from "../../../controller/vehicle/vehicleController";

//import style
import "./Vehicle.css";
import FormItem from "antd/es/form/FormItem";

const defaultObject = {
  name: "",
  weight: "",
  capacity: "",
  fuel: "",
};

const NewVehicle = () => {
  const [vehicleAdd, setVehicleAdd] = useState({ ...defaultObject });
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 6,
    },
  });
  const [form] = Form.useForm();
  const vehicle = new Vehicle();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await vehicle.getAllVehicle().then((res) => {
          setVehicleData(JSON.parse(res));
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

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize)
      setVehicleData([]);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: "15%",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      sorter: true,
      width: "20%",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      sorter: true,
      width: "20%",
    },
    {
      title: "Fuel",
      dataIndex: "fuel",
      sorter: true,
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      width: "10%",
      align: "center",
      render: (status) => {
        let color = status === "free" ? "green" : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Create At",
      dataIndex: "created_at",
      sorter: true,
      width: "15%",
      align: "right",
    },
  ];

  const onChange = (event) => {
    setVehicleAdd((prev) => ({
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
      label: "Weight",
      name: "weight",
    },
    {
      label: "Capacity",
      name: "capacity",
    },
    {
      label: "Fuel (L)",
      name: "fuel",
    },
  ];

  const formRender = formItems.map((element) => {
    let props = {
      disabled: element.name === "weight" ? true : false,
      value: element.name === "weight" ? "0" : vehicleAdd[element.name],
    };
    return (
      <FormItem label={element.label} key={element.name}>
        <Input
          {...props}
          type="text"
          className={`profile__${element.name}`}
          name={element.name}
          onChange={(event) => onChange(event)}
        />
      </FormItem>
    );
  });

  const defaultFooter = () => {
    return (
      <span className="table__footer">{`Total: ${vehicleData.length}`}</span>
    );
  };

  const onSubmitVehicle = async () => {
    let convertedObject = {};
    Object.keys(vehicleAdd).forEach((key) => {
      if (key === "weight" || key === "capacity" || key === "fuel") {
        if (key === "weight") {
          convertedObject[key] = 0;
        } else {
          convertedObject[key] = parseInt(vehicleAdd[key]);
        }
      } else {
        convertedObject[key] = vehicleAdd[key];
      }
    });
    await vehicle.addVehicle(convertedObject).then((res) => {
      console.log(res);
      const updatedVehicle = [...vehicleData];
      updatedVehicle.push(res.data);
      setVehicleData(updatedVehicle);
      setVehicleAdd({ ...defaultObject });
      setModal(false);
    });
  };

  return (
    <div className="table">
      <div className="table__header">
        <div className="table__title">Vehicles</div>
        <div className="table__add__mcp">
          <Button
            onClick={() => {
              setModal(true);
            }}
          >
            Create Vehicles
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
          dataSource={vehicleData}
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
                setVehicleAdd({ ...defaultObject });
              }}
            >
              Cancel
            </Button>
          </div>
        }
        className="modal"
      >
        <Form form={form} onFinish={onSubmitVehicle}>
          {formRender}
        </Form>
      </Modal>
    </div>
  );
};

export default NewVehicle;
