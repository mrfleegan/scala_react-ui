import React from "react";
import {AuthContext} from "./AuthContext";
import {Redirect} from "react-router-dom";

//import jwt_decode from "jwt-decode";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: "Derpy derp derp",
      playCookie: [],
      redirectOnLogin: false,
    };
  }

  static contextType = AuthContext;

  componentDidMount() {}

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let authContext = this.context;

    await fetch("./login", {
      //mode: "no-cors",
      method: "POST",
      credentials: "same-origin",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token.token;
        const userInfo = data.userInfo;
        const expiresAt = data.expiresAt;
        console.log("jwt token.token: " + token);
        console.log("user first name: " + userInfo.firstName);
        console.log("token expiry: " + expiresAt);
        authContext.setAuthState(data);

        if (authContext.isAuthenticated) {
          setTimeout(() => {
            this.setState({
              redirectOnLogin: true,
            });
          }, 700);
          console.log("I'm authenticated!");
        }
      });
  }

  render() {
    /*  {
      if (this.state.redirectOnLogin) return <Redirect to="/dashboard" />;
    } */

    return (
      <>
        {this.state.redirectOnLogin && <Redirect to="/dashboard" />}
        <div>
          <span>-CSRF Token:{this.props.csrfToken}</span>
          <form
            id="simple-form"
            // action={"./simpleform?csrfToken=" + this.props.csrfToken}
            //action="./login"
            onSubmit={this.handleSubmit}
            //method="POST"
          >
            <input
              name="csrfToken"
              value={this.props.csrfToken}
              type="hidden"
            />
            <label htmlFor="username">username:</label>
            <input type="text" id="username_id" name="username" />
            <label htmlFor="password">password:</label>
            <input type="password" id="password_id" name="password" />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </>
    );
  }
}
Login.contextType = AuthContext;

export default Login;
