//import lib
import { useState, useEffect } from "react";
import { Form,Button, Input } from "antd";

const defaultObject = {
    id: "",
    weight: "",
    capacity: "",
    fuel: "",
    status: "",
};

const VehicleAdd = () => {
    const [vehicleData, setVehicleData] = useState({...defaultObject}); 

    const onChange = event => {
        setVehicleData(prev => ({
            ...prev, [event.target.name]: event.target.value, status: "free"
        }));
    }

    const onAdd = () => {
        console.log(vehicleData);
        setVehicleData({...defaultObject});
    }
    
    const formItems = [
        {
            label: "ID",
            name: "id",
        },
        {
            label: "Weight(Tons)",
            name: "weight",
        },
        {
            label: "Capacity(Tons)",
            name: "capacity",
        },
        {
            label: "Fuel(Litre)",
            name: "fuel"
        },
    ];

    const formRender = formItems.map(element=>{
        return (
            <Form.Item label={element.label} key={element.name}>
                <Input type="text" className={`profile__${element.name}`} name={element.name} onChange={event=>onChange(event)} value={vehicleData[element.name]} />
            </Form.Item>)
    });

    return (
        <Form
            layout= "vertical"
        >
            <div className="form__title">Add Vehicle</div>
            {formRender}
            <Form.Item><Button onClick={onAdd}>Add</Button></Form.Item>
        </Form>
    );
}

export default VehicleAdd;