import { useState, useContext } from "react";

import "../App.scss";

import Navigation from "./Navigation";

import { UserContext } from "../context/user.context";

const loginUser = async (credentials) => {
  // [email, password] = [...credentials];
  console.log("Creed", credentials);
  console.log("email:", credentials.email);
  return await fetch(
    "http://localhost:8080/api/v1/users/email/" + credentials.email
  ).then((data) => data.json());
};

const showUser = async (id) => {
  return await fetch("http://localhost:8080/api/v1/users/uuid/" + id).then(
    (data) => data.json()
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState("");

  const { setCurrentUser } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const response = await loginUser({
      email,
      password,
    });
    console.log("response:", response);
    if (response && response.password === password) {
      console.log("Found the user");
      const user = await showUser(response.id);
      console.log("user:", user);
      setUser(user);
      setCurrentUser(user);

      const userData = {
        email,
        password,
        user,
      };
      localStorage.setItem("token-info", JSON.stringify(userData));
      const items = JSON.parse(localStorage.getItem("token-info"));
      console.log("items", items.user.first_name);
      setIsLoggedin(true);
      setEmail("");
      setPassword("");
      return;
    } else {
      console.log("User not found");
    }
  };

  console.log("isLoggedin:", isLoggedin);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Login </h1>
        {!isLoggedin ? (
          <>
            <form action="">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
              <button type="submit" onClick={login}>
                GO
              </button>
            </form>
          </>
        ) : (
          <>
            <h1>User {user.first_name} is logged in</h1>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
