//import lib
import { Button, Form, Input } from 'antd'
import { useState } from 'react';

//import style
import './Login.css';

//import image
import logo from '../../assets/images/Logo.jpg';


const Login = () =>{
    const [loginError, setLoginError] = useState('');
    const [canSubmit, setCanSubmit] = useState(true);

      // Check password regex in rules if there is any
  const onLogin = (event) => {
    if (canSubmit) {
      try {
        setCanSubmit(false)
        // const submitUsername = values.username.trim();
        console.log(event);
      } catch (err) {
        setLoginError(err.response.data.message)
      } finally {
        setCanSubmit(true)
      }
    }
    return;
  }
  // reset Error when input change
  const onFieldChange = () => {
    setLoginError('');
  }
      // formItems elements data
    const formItems = [
    {
      name: 'username',
      label: 'Username',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password'
    }
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
      })

    return (
        <div className="login">
            <div className='login__wrapper'>
                <div className='login__wrapper__left'>
                    <div className="login__img">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className='login__wrapper__right'>
                    <div className="login__title">Welcome</div>
                    <div className="login__form">
                        <Form layout="vertical"
                            colon={false}
                            onFinish={(event)=>{onLogin(event)}}
                            onFieldsChange={onFieldChange}>
                            {renderedFormItem}
                            <Button disabled={!canSubmit} htmlType='submit' className="login__btn">Login</Button>
                            </Form>
                        {loginError && <div className="login__error">{loginError}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;