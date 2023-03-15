import { Button, Form, Input } from 'antd';
import { message, Upload } from "antd";

//import hooks
import { useState } from 'react';

//import style
import './Register.css'
import '../../assets/variable.css'
import upload from '../../assets/images/export.jpg';


const Register = () =>{
    const [registerError, setRegisterError] = useState('');
    const [submitData, setSubmitData] = useState({});
    const [canSubmit, setCanSubmit] = useState(true);

    const formItems = [
        {
            name: 'username',
            label: 'Username',
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password'
        },
    ];
    // create form.item elements
    const renderedFormItem = formItems.map((formItem) => {
        const rules = [{
          whitespace: true,
          required: true,
          message: `${formItem.label} can not be empty`
        }];
        const props = {
          placeholder: `Enter your ${formItem.label}`,
          className: "login__input__field"
        }
    
        let input;
        switch (formItem.type) {
            case 'password':
                input = <Input.Password {...props} />
                break;
            default:
                input = <Input {...props} />
                break;
        }
    
        return (
          <Form.Item key={formItem.name} className="login__input"
            name={formItem.name} label={formItem.label}
            rules={rules}
          >{input}
          </Form.Item>
        )
      });

  // Check password regex in rules if there is any
  const onRegister = async (values) => {
    if (canSubmit) {
      try {
        setCanSubmit(false);
        const submitUsername = values.username.trim();
        const submitPassword = values.password.trim();
      } catch (err) {
        setLoginError(err.response.data.message)
      } finally {
        setCanSubmit(true)
      }
    }
    return;
  }
  // reset Error when input change
  const onChange = (name, info) => setSubmitData({...submitData, [name]: info.fileList});
  const onFieldsChange = () =>{
    setRegisterError('');
  }

  const { Dragger } = Upload;
  const dummyRequest = ({ onSuccess }) => {
      setTimeout(() => {
          onSuccess('done');
      }, 0);
  }

  const fileProps = {
      name: 'file',
      multiple: true,
      customRequest: dummyRequest,
      onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
              console.log(info.file, info.fileList);
          }
          if (status === 'done') {
              message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
          }
      },
  };

    return (

    <div className="Register" >


        <Form 
            layout="vertical"
            colon={false}
            onFinish={onRegister}
            onFieldsChange={onFieldsChange}
            className="FormRegister"
        >
            <div className="Register__title">Create An Account</div>
            <div className="Register__line"></div>
            {renderedFormItem}
            <Form.Item className="Modal__labelForm">
                <label>Set up your Avatar</label>
                <Dragger
                    name="avatar"
                    {...fileProps}
                    onChange={(info)=>{onChange("avatar",info)}}
                    beforeUpload={(file) => {
                        const name = file.name;
                        let checkExist = false;
                        for (const type of element.type) {
                            if (name.includes(type)) {
                            checkExist = name.includes(type);
                            break;
                            }
                        }
                        if (!checkExist) {
                            message.error(`${name} is not an accepted type of file`);
                        }
                        return checkExist || Upload.LIST_IGNORE;
                    }}
                >
                    <div className="Register__file">
                        <div className="Register__file__img"><img src={upload} alt="export image" /></div>
                        <div className="Register__file__content">Drag image or browse to <span style={{ color: "#FF69A5" }}>select file</span></div>
                    </div>
                </Dragger>
            </Form.Item>
            <Button htmlType='submit' className="Register__btn button">Register</Button>
      </Form>
    </div>
    );
};

export default Register;