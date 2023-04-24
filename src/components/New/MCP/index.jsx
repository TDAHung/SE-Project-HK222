//import lib
import { useState,useEffect } from "react";
import { Form, Button, Input, Table, Modal } from "antd";
import uuid from "react-uuid";

//import controller
import MCP from "../../../controller/mcp/mcpController";

//import style
import './MCP.css';

const defaultObject = {
    id: "",
    startPoint: "",
    destinationPoint: "",
    status: ""
};

const NewMCP = () =>{
    const [mcpAdd,setMcpAdd] = useState({...defaultObject});
    const [mcpData, setMcpData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [modal,setModal] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 6,
        }
    });

    const mcp = new MCP();

    useEffect(()=>{
        const fetch = async () =>{
            try{
                setLoading(true);
                const data = await mcp.getAllMCP();
                setMcpData(data);
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
    },[mcpAdd]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
          pagination,
          filters,
          ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) setMcpData([]);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Start',
            dataIndex: 'startPoint',
            sorter: true,
            width: '45%',
        },
        {
            title: 'Destination',
            dataIndex: 'destinationPoint',
            sorter: true,
            width: '45%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true,
            width: '10%',
            align: 'center'
        },
    ];


    const onChange = event => {
        setMcpAdd(prev => ({
            ...prev, [event.target.name]: event.target.value, status: "free"
        }));
    }

    const onAdd = async () => {
        await mcp.addMCP(mcpAdd);
        console.log(mcpData);
        setMcpAdd({...defaultObject});
        setModal(false);
    }
    
    const formItems = [
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

    const defaultFooter = () =>{
        return <span className="table__footer">{`Total: ${mcpData.length}`}</span>
    };

    return (
        <div className="table">
        <div className="table__header">
            <div className="table__title">MCP</div>
            <div className="table__add__mcp"><Button onClick={()=>{setModal(true)}}>Create MCP</Button></div>
        </div>
        <div className="table__content">
        <Table 
            columns={columns}
            loading={loading}
            rowKey={()=>{uuid()}}
            pagination={tableParams.pagination}
            dataSource={mcpData}
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
                <div className="Map"></div>
                <Button style={{marginTop: '1rem'}}>View MCP</Button>
            </Form>
        </Modal>
        </div>

    );
}

export default NewMCP;