//import lib
import { useState, useEffect } from "react";
import { Form,Button, Input } from "antd";

const defaultObject = {
    id: "",
    startPoint: "",
    destinationPoint: "",
    status: ""
};

const McpAdd = () => {
    const [mcpAdd,setMcpAdd] = useState({...defaultObject});

    const onChange = event => {
        setMcpAdd(prev => ({
            ...prev, [event.target.name]: event.target.value, status: "free"
        }));
    }

    const onAdd = () => {
        console.log(mcpAdd);
        setMcpAdd({...defaultObject});
    }
    
    const formItems = [
        {
            label: "ID",
            name: "id",
        },
        {
            label: "Starting Point",
            name: "startPoint",
        },
        {
            label: "Destination Point",
            name: "destinationPoint",
        },
    ];

    const formRender = formItems.map(element=>{
        return (
            <Form.Item label={element.label} key={element.name}>
                <Input type="text" className={`profile__${element.name}`} name={element.name} onChange={event=>onChange(event)} value={mcpAdd[element.name]} />
            </Form.Item>)
    });

    return (
        <Form
            layout="vertical"
        >
            <div className="form__title">Add MCP</div>
            {formRender}
            <Form.Item><Button onClick={onAdd}>Add</Button></Form.Item>
        </Form>
    );
}

export default McpAdd;