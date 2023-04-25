//import lib
import { Button, Form, Input } from "antd";
import { useState } from "react";
import sign from "jwt-encode";
//import style
import "./Login.css";
//import image
import logo from "../../assets/images/Logo.png";

//import api
import User from "../../controller/user/userController";
import { SECRET } from "../../utils/constants";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [userData, setUserData] = useState([]);
  const user = new User();

  // Check password regex in rules if there is any
  const onLogin = (event) => {
    if (canSubmit) {
      try {
        user
          .login(
            sign(
              {
                usn: event.username,
                pwd: event.password,
              },
              SECRET
            )
          )
          .then((res) => {
            console.log(res.data);
            localStorage.setItem(
              "accessToken",
              JSON.stringify(res.data.access_token)
            );
            localStorage.setItem("user", JSON.stringify(res.data.employee));
            sessionStorage.setItem("onLogin", "true");
            setLoginError();
            window.location.reload(false);
            return;
          });
      } catch (err) {
        setLoginError(err.response.data.message);
      }
    }
  };
  // reset Error when input change
  const onFieldChange = () => {
    setLoginError("");
    setCanSubmit(true);
  };
  // formItems elements data
  const formItems = [
    {
      name: "username",
      label: "Username",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
  ];

  // create form.item elements
  const renderedFormItem = formItems.map((formItem) => {
    const rules = [
      {
        whitespace: true,
        required: true,
        message: `${formItem.label} can not be empty`,
      },
    ];
    const props = {
      placeholder: `Enter your ${formItem.label}`,
      className: "login__input__field",
    };

    let input;
    switch (formItem.type) {
      case "password":
        input = <Input.Password {...props} />;
        break;
      default:
        input = <Input {...props} />;
        break;
    }

    return (
      <Form.Item
        key={formItem.name}
        className="login__input"
        name={formItem.name}
        label={formItem.label}
        rules={rules}
      >
        {input}
      </Form.Item>
    );
  });

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__wrapper__left">
          <div className="login__img">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="login__wrapper__right">
          <div className="login__title">Welcome</div>
          <div className="login__form">
            <Form
              layout="vertical"
              colon={false}
              onFinish={(event) => {
                onLogin(event);
              }}
              onFieldsChange={onFieldChange}
            >
              {renderedFormItem}
              {loginError && <div className="login__error">{loginError}</div>}
              <Button
                disabled={!canSubmit}
                htmlType="submit"
                className="login__btn"
              >
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
