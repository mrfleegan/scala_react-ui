import React from "react";
import Cookies from "js-cookie";
import {FetchContext} from "../FetchContext";

class Dashboard extends React.Component {
  static contextType = FetchContext;

  async requestPeopleAxios() {
    await this.context.authAxios
      .get(`https://localhost:9443/api/securedListOfPeople`, {
        /*  headers: {
          "Access-Control-Allow-Origin": "*",
        } */ crossdomain: true,
      })
      .then((res) => {
        return res;
        //return res.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        this.setState({
          people: data.data,
          loading: false,
          playToken: Cookies.get("Csrf-Token"),
        });
      });
  }

  /* async requestPeopleAxios() {
    await this.context.authAxios
      .get(`api/securedListOfPeople`, {
        credentials: "same-origin",
      })
      .then((res) => {
        return res;
        //return res.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        this.setState({
          people: data.data,
          loading: false,
          playToken: Cookies.get("Csrf-Token"),
        });
      });
  } */

  componentDidMount() {
    this.requestPeopleAxios();
  }

  render() {
    return (
      <>
        <div>
          <span>Your friendly neighborhood `Dashboard`</span>
        </div>
      </>
    );
  }
}

export default Dashboard;
