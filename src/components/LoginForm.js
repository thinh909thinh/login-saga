import React, { useEffect, useState } from "react";
import { memo } from "react";

import PropTypes from "prop-types";
import { onSubmit } from "../redux/store";
import { getAll } from "../redux/sagas";
import "./form.css";
const LoginForm = ({ pendingLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPass(event.target.value);
  };
  useEffect(() => {
    console.log("memo");
    getAll();
  }, []);
  const submit = () => {
    console.log("valueUsername, password", username, password);
    onSubmit(username, +password);
  };

  return (
    // <>
    //   <input
    //     type="text"
    //     value={username}
    //     onChange={onChangeUsername}
    //     placeholder="username"
    //   />
    //   <input
    //     type="password"
    //     value={password}
    //     onChange={onChangePassword}
    //     placeholder="password"
    //   />
    //   <button onClick={submit} disabled={pendingLogin}>
    //     Login
    //   </button>

    // </>
    <>
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input
              type="text"
              value={username}
              onChange={onChangeUsername}
              placeholder="username"
            />
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="password"
            />
            <button className="button" onClick={submit} disabled={pendingLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(LoginForm);
