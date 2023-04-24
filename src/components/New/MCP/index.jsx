//import lib
import { useState, useEffect, useCallback } from "react";
import { Form, Button, Input, Table, Modal } from "antd";
import uuid from "react-uuid";

//import controller
import MCP from "../../../controller/mcp/mcpController";

//import style
import "./MCP.css";

// Google Map
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../../utils/constants";

const defaultObject = {
  namePoint: "",
  addressPoint: "",
  status: "",
};

const containerStyle = {
  width: "450px",
  height: "400px",
};

const center = {
  lat: 10.8231,
  lng: 106.6297,
};

const NewMCP = () => {
  const [mcpAdd, setMcpAdd] = useState({ ...defaultObject });
  const [mcpData, setMcpData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 6,
    },
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState("");
  const [isViewMap, setIsViewMap] = useState(false);
  const [inputSearch, setInputSeach] = useState("");
  const [inputName, setInputName] = useState("");
  const [objectPlace, setObjectPlace] = useState({});

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLng(center);
    console.log(map);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoadAutoComplete = useCallback(function (autocomplete) {
    console.log("autocomplete", autocomplete);
    setAutocomplete(autocomplete);
  });

  const onPlaceChanged = useCallback(function () {
    if (autocomplete !== null) {
      // formatted_address
      let objPLace = autocomplete.getPlace();
      console.log("address", objPLace["formatted_address"]);
      console.log("lat", objPLace["geometry"]["location"].lat());
      console.log("lng", objPLace["geometry"]["location"].lng());
      console.log("objPLace", objPLace);
      setObjectPlace({
        address: objPLace["formatted_address"],
        location: {
          lat: objPLace["geometry"]["location"].lat(),
          lng: objPLace["geometry"]["location"].lng(),
        },
      });
      setAddress(objPLace["formatted_address"]);
      setInputSeach(objPLace["formatted_address"]);
    }
  });

  const mcp = new MCP();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await mcp.getAllMCP();
        setMcpData(data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 100,
          },
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetch();
  }, [mcpAdd]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize)
      setMcpData([]);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "namePoint",
      sorter: true,
      width: "45%",
    },
    {
      title: "Address",
      dataIndex: "addressPoint",
      sorter: true,
      width: "45%",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      width: "10%",
      align: "center",
    },
  ];

  const onChange = (event) => {
    setMcpAdd((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
      status: "free",
    }));
  };

  const onAdd = async () => {
    // await mcp.addMCP(mcpAdd);
    console.log(mcpData);
    // setMcpAdd({ ...defaultObject });
    // setModal(false);
  };

  const formItems = [
    {
      label: "Name",
      name: "namePoint",
    },
    {
      label: "Address",
      name: "addressPoint",
    },
  ];

  const formRender = formItems.map((element) => {
    return (
      <Form.Item label={element.label} key={element.name}>
        <Input
          type="text"
          className={`profile__${element.name}`}
          name={element.name}
          onChange={(event) => onChange(event)}
          value={mcpAdd[element.name]}
        />
      </Form.Item>
    );
  });

  const defaultFooter = () => {
    return <span className="table__footer">{`Total: ${mcpData.length}`}</span>;
  };

  return isLoaded ? (
    <div className="table">
      <div className="table__header">
        <div className="table__title">MCP</div>
        <div className="table__add__mcp">
          <Button
            onClick={() => {
              setModal(true);
            }}
          >
            Create MCP
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
          dataSource={mcpData}
          rowClassName="table__row"
          size="large"
          onChange={handleTableChange}
          footer={defaultFooter}
        />
      </div>
      <Modal
        style={{ width: "550px" }}
        open={modal}
        cancelText={null}
        closable={false}
        confirmLoading={true}
        footer={
          <div className="modal__footer">
            <Button
              className="modal__assign"
              onClick={() => {
                onAdd();
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
        <Form>
          <Form.Item label="Name" name="NameMCP">
            <Input
              type="text"
              placeholder="MCP's name"
              className="mcp__name"
              name="NameMCP"
              onChange={(e) => {
                setInputName(e.target.value);
              }}
              value={inputName}
              style={{ width: "410px" }}
            />
          </Form.Item>
          <Form.Item label="MCP" name="MCP">
            {/* <Autocomplete
              onLoad={onLoadAutoComplete}
              onPlaceChanged={onPlaceChanged}
              bounds={
                new window.google.maps.LatLngBounds(
                  new window.google.maps.LatLng(center.lat, center.lng)
                )
              }
            > */}
              <Input
                type="text"
                placeholder="Add MCP point"
                value={inputSearch}
                onChange={(e) => {
                  setInputSeach(e.target.value);
                }}
                style={{ width: "420px" }}
              />
            {/* </Autocomplete> */}
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{ width: "180px", justifyContent: "flex-end" }}
              onClick={() => setIsViewMap(true)}
            >
              View MCP on map
            </Button>
          </Form.Item>
          <Form.Item>
            {isViewMap && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={objectPlace.location}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <MarkerF position={objectPlace.location} />
              </GoogleMap>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  ) : (
    <>Loading Goole</>
  );
};

export default NewMCP;
