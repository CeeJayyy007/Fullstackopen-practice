import { useState } from "react";
import PropTypes from "prop-types";

//login form
const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    login({
      username,
      password,
    });

    setUsername("");
    setPassword("");
  };

  LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
