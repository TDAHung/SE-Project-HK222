//import lib
import { Table, Form, Tag } from "antd";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { Button, Modal, Input, Typography, DatePicker, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
//import Controller
import Task from "../../../controller/task/taskController";

//import style
import "./CollectorTable.css";
import "../Assign.css";
import gas from "../../../assets/images/gas-pump-solid.png";
import weight from "../../../assets/images/weight-scale-solid.png";
import strength from "../../../assets/images/hand-fist-solid.png";
import location from "../../../assets/images/location-crosshairs-solid.png";
import MCP from "../../../controller/mcp/mcpController";
import User from "../../../controller/user/userController";
import Vehicle from "../../../controller/vehicle/vehicleController";

import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../../utils/constants";

const defaultObject = {
  user: "",
  date: "",
  origin: "",
  destination: "",
  vehicle: "",
};

const containerStyle = {
  width: "500px",
  height: "450px",
};

const center = {
  lat: 10.8231,
  lng: 106.6297,
};

const CollectorTable = ({ date }) => {
  const [taskAdd, setTaskAdd] = useState({ ...defaultObject });
  const [taskData, setTaskData] = useState([]);
  const [listMCP, setListMCP] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [listVehicle, setListVehicle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [isViewRoute, setIsViewRoute] = useState(false);
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
  const vehicle = new Vehicle();

  const [directionsState, setDirectionsState] = useState(null);
  // React.useState<google.maps.DirectionsResult | null>(null);
  const [libraries] = useState(["places"]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const handleViewRoute = (origin, destination) => {
    if (!window.google) {
      return;
    }

    const DirectionsService = new google.maps.DirectionsService();
    // const MatrixService = new google.maps.DistanceMatrixService();

    DirectionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsState(result);
          // directionsSetter(result);
          console.log(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await task.getAllTask("collector").then((res) => {
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
        await employee.getAllUser("free", "collector").then((res) => {
          setListEmployee(JSON.parse(res));
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
        await vehicle.getAllVehicle("free").then((res) => {
          setListVehicle(JSON.parse(res));
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
      width: "10%",
      //   render: (object) => object.fullname,
    },
    {
      title: "Employee",
      dataIndex: "user",
      width: "15%",
      render: (object) => object.fullname,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "5%",
      align: "center",
      render: (status) => {
        let color = status === "New" ? "green" : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Origin",
      dataIndex: "origin",
      width: "20%",
      render: (object) => {
        return (
          <Typography.Text ellipsis={true} style={{ width: "250px" }}>
            {object.address}
          </Typography.Text>
        );
      },
    },
    {
      title: "Destination",
      dataIndex: "destination",
      sorter: true,
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
    },

    {
      title: "Vehicle",
      dataIndex: "vehicle",
      sorter: true,
      render: (object) => object.name,
      // align: "right",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "10%",
      render: (text, record, index) => {
        return (
          <Button
            id={record.id}
            onClick={(e) => {
              handleViewRoute(
                {
                  lat: record["origin"]["lat"],
                  lng: record["origin"]["lng"],
                },
                {
                  lat: record["destination"]["lat"],
                  lng: record["destination"]["lng"],
                }
              );
              setIsViewRoute(true);
            }}
            //record is the row data
            // size="large"
          >
            View Route
          </Button>
        );
      },
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
      label: "Origin",
      name: "origin",
    },
    {
      label: "Destination",
      name: "destination",
    },
    {
      label: "Date",
      name: "date",
    },
    {
      label: "Vehicle",
      name: "vehicle",
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
      } else if (
        element.label === "Origin" ||
        element.label === "Destination"
      ) {
        iterators = listMCP;
        options = "address";
      } else {
        iterators = listVehicle;
        options = "name";
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
    await task.addTask(taskAdd, "collector").then((res) => {
      const updatedTask = [...taskData];
      updatedTask.push(res.data);
      setTaskData(updatedTask);
      setTaskAdd({ defaultObject });
      setModal(false);
    });
  };

  const footerTask = () => (
    <span className="table__footer">Total: {taskData.length}</span>
  );

  const handleOk = () => {
    setIsViewRoute(false);
  };
  const handleCancel = () => {
    setIsViewRoute(false);
  };

  return (
    <div className="table" width="500px">
      <div className="table__header">
        <div className="table__title">Task Collector</div>
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
      <Modal
        title="View Route"
        className="viewRouteModal"
        open={isViewRoute}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{left: "45px"}}
        width="550px"
      >
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            {directionsState && (
              <DirectionsRenderer options={{ directions: directionsState }} />
            )}
          </GoogleMap>
        )}
      </Modal>
    </div>
  );
};

export default CollectorTable;
