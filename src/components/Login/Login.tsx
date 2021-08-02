import { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Routes } from "~/constants";
import login from "~/services/login";
import ErrorBlock from "../Error/ErrorBlock";

import "./login-style.scss";

const Login = () => {
  const { push } = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (username && password) {
      try {
        await login(username, password);
        push(Routes.PasswordHealth);
      } catch (error) {
        setErrorMessage(
          "The username or password you entered is incorrect, please try again."
        );
      }
    } else {
      setErrorMessage("Please enter your username and password");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Password Health</h1>
        <ErrorBlock error={errorMessage} />
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          type="text"
          className="input mt-24px"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="input mt-24px"
        />
        <button type="submit" className="button mt-24px">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
