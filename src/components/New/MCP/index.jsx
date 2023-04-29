//import lib
import { useState, useEffect, useCallback } from "react";
import { Form, Button, Input, Table, Modal, Tag } from "antd";
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
  name: "",
  address: "",
  lat: "",
  lng: "",
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
  const [mcpData, setMcpData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [libraries] = useState(["places"]);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 6,
    },
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
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
    setAutocomplete(autocomplete);
  });

  const onPlaceChanged = useCallback(function () {
    if (autocomplete !== null) {
      // formatted_address
      let objPLace = autocomplete.getPlace();
      setObjectPlace({
        address: objPLace["formatted_address"],
        location: {
          lat: objPLace["geometry"]["location"].lat(),
          lng: objPLace["geometry"]["location"].lng(),
        },
      });
      setInputSeach(objPLace["formatted_address"]);
    }
  });

  const mcp = new MCP();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await mcp.getAllMCP().then((res) => {
          console.log(JSON.parse(res));
          setMcpData(JSON.parse(res));
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
      setMcpData([]);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: "35%",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: true,
      width: "55%",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "active",
      sorter: true,
      width: "10%",
      align: "center",
      key: "active",
      render: (status) => {
        let statusActive = status ? 'active' : 'inactive';
        let color = status ? 'green' : 'volcano';
        return (
            <Tag color={color}>
              {statusActive.toUpperCase()}
            </Tag>
          );
        }
    }
  ];

  const onAdd = async () => {
    const obj_request = {
      name: inputName,
      address: objectPlace.address,
      lat: objectPlace.location.lat,
      lng: objectPlace.location.lng,
    };
    mcp.addMCP(obj_request).then((res) => {
      const updateMCPData = [...mcpData];
      updateMCPData.push(res.data);
      setMcpData(updateMCPData);
    });
    setModal(false);
  };

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
            <Autocomplete
              onLoad={onLoadAutoComplete}
              onPlaceChanged={onPlaceChanged}
              bounds={
                new window.google.maps.LatLngBounds(
                  new window.google.maps.LatLng(center.lat, center.lng)
                )
              }
            >
              <Input
                type="text"
                placeholder="Add MCP point"
                value={inputSearch}
                onChange={(e) => {
                  setInputSeach(e.target.value);
                }}
                style={{ width: "420px" }}
              />
            </Autocomplete>
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