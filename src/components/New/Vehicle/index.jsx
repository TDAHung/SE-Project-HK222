//import lib
import { useState, useEffect, useCallback } from "react";
import { Form, Button, Input, Table, Modal } from "antd";
import uuid from "react-uuid";

//import controller
import Vehicle from "../../../controller/vehicle/vehicleController";

//import style
import "./Vehicle.css";
import FormItem from "antd/es/form/FormItem";


const defaultObject = {
    id: "",
    weight: "",
    capacity: "",
    fuel: "",
    status: ""
};

const NewVehicle = () =>{

    const [vehicleAdd, setVehicleAdd] = useState({...defaultObject});
    const [vehicleData, setVehicleData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 6,
        }
    });
    const vehicle = new Vehicle();

    useEffect(()=>{
        const fetch = async () =>{
            try{
                setLoading(true);
                const data = await vehicle.getAllVehicle();
                setVehicleData(data);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 100
                    }
                });
            }catch(error){
                console.log(error);
            }
            setLoading(false);
        }
        fetch();
    },[modal]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) setVehicleData([]);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            sorter: true,
            width: '25%',
        },
        {
            title: 'Capacity',
            dataIndex: 'capacity',
            sorter: true,
            width: '25%',
        },
        {
            title: 'Fuel',
            dataIndex: 'fuel',
            sorter: true,
            width: '25%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true,
            width: '20%',
            align: 'center'
        },
    ];

    const onChange = event => {
        setVehicleAdd(prev => ({
            ...prev, [event.target.name]: event.target.value, status: "free"
        }));
    }

    const onAdd = async () => {
        await vehicle.addVehicle(vehicleAdd);
        console.log(vehicleData);
        setMcpAdd({...defaultObject});
        setModal(false);
    }
    
    const formItems = [
        {
            label: "Weight",
            name: "weight",
        },
        {
            label: "Capacity",
            name: "capacity",
        },
        {
            label: "Fuel",
            name: "fuel",
        },
    ];

    const formRender = formItems.map(element => {
        return (
            <FormItem label={element.label} key={element.name}>
                <Input
                    type="text"
                    className={`profile__${element.name}`}
                    name={element.name}
                    onChange={event => onChange(event)}
                    value={vehicleAdd[element.name]}
                />
            </FormItem>
        )
    });

    const defaultFooter = () => {
        return (
            <span className="table__footer">{`Total: ${vehicleData.length}`}</span>
        )
    }

    return (
        <div className="table">
            <div className="table__header">
                <div className="table__title">Vehicles</div>
                <div className="table__add__mcp"><Button onClick={()=>{setModal(true)}}>Create Vehicles</Button></div>
            </div>
            <div className="table__content">
                <Table 
                    columns={columns}
                    loading={loading}
                    rowKey={()=>{uuid()}}
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
                footer={<div className='modal__footer'>
                            <Button className="modal__assign" onClick={()=>{onAdd()}}>Create</Button>
                            <Button className="modal__cancel" onClick={()=>{setModal(false)}}>Cancel</Button>
                        </div>}
                className="modal"
            >
                <Form>
                    {formRender}
                    <Button style={{marginTop: '1rem'}}>View Vehicles</Button>
                </Form>
            </Modal>
        </div>
    );
}


export default NewVehicle;

