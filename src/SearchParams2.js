import React from "react";
import Results from "./Results";
import Cookies from "js-cookie";
//import jwt_decode from "jwt-decode";
import Login from "./Login";
import {publicFetch} from "./util/fetch";

class SearchParams2 extends React.Component {
  state = {
    loading: true,
    people: [],
    playToken: "",
  };

  async requestPeopleAxios() {
    await publicFetch
      .get(`api/listOfPeople`, {
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
  }

  async requestPeople() {
    await fetch("https://localhost:9443/api/listOfPeople", {
      //mode: "no-cors",
      method: "GET",
      credentials: "same-origin",
    })
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        return res.json();
      })
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
        this.setState({
          people: data,
          loading: false,
          playToken: Cookies.get("Csrf-Token"),
        });
      });
  }

  componentDidMount() {
    this.requestPeopleAxios();
  }

  render() {
    if (this.state.loading) {
      console.log("============PAUSING==================");
      return <h1>loading...</h1>;
    }

    const { people } = this.state;
    const { playToken } = this.state;
    console.log("play token: " + playToken);
    return (
      <div>
        <div>
          <span>TokenZ: {playToken}</span>
        </div>
        <Login csrfToken={playToken} />
        <Results people={people} />
      </div>
    );
  }
}
export default SearchParams2;
