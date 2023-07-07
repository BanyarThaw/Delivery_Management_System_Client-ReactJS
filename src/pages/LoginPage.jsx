import "../styles/login.css";
import Form from "../components/Form";
import logo from "../icons/bikers.svg";
import { useState } from "react";

const info =  { data: [
  {
    id: 1,
    label: "Username",
    type: "text",
    name: "username",
    value: "",
    placeholder: "Your username",
    required: true
  },
  {
    id: 2,
    label: "Password",
    type: "password",
    name: "password",
    value: "",
    placeholder: "Your password",
    required: true
  }
],
showMessage: false };

const LoginPage = ({ checkUser }) => {
  const [loginInfo,setloginInfo] = useState(info);

  const toggleMessage = () =>
    setloginInfo(loginInfo => ({
      ...loginInfo,
      showMessage: !loginInfo.showMessage
  }));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let timer = "";

    clearTimeout(timer);

    const setTime = () => {
      timer = setTimeout(
        () => (loginInfo.showMessage ? toggleMessage() : null),
        2000
      );
    };

    checkUser({username: e.target.username.value,password: e.target.password.value}).then(res => {
      if (res.meta.requestStatus === "rejected") {
        if (!loginInfo.showMessage) {
          toggleMessage();
        }
        setTime();
      }
    });
  };

  return (
    <>
      <section className="login">
        {loginInfo.showMessage && (
          <div className="message error">Login Error. Try again.</div>
        )}
        <img className="App-logo" alt="Delivery control" src={logo} />
        <h1>Delivery control</h1>
        <h2>Login</h2>
        <Form
          loginInfo={loginInfo}
          setloginInfo={setloginInfo}
          className="login-form"
          handleSubmit={handleSubmit}
        />
      </section>
    </>
  );
}

export default LoginPage;
