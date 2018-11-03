import React from "react";
import "./Second.css";
import Collapsed from "../../components/Collapsible";
import { Cardy } from "../../components/Card";
import { Col, CardPanel, Icon } from "react-materialize";
import axios from "axios-jsonp-pro";

class Second extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
      liked: [1]
    };
  }

  handleChange(id, event) {
    const { liked } = this.state;

    if (liked.length >= 1) {
      if (liked.includes(id)) {
        for (var i = 0; i < liked.length; i++) {
          if (liked[i] === id) {
            liked.splice(i, 1);
          }
        }axios({
          method: "put",
          url: "http://localhost:5000/api/delete",
          data: {
            username: sessionStorage.getItem("user"),
            name: event.name
          }
        }).then(
        this.setState({ liked: liked }));
        // if not found
      } else {
        console.log(sessionStorage.getItem("user"));
        console.log(event.name);
        axios({
          method: "put",
          url: "http://localhost:5000/api/users",
          data: {
            username: sessionStorage.getItem("user"),
            name: event.name,
            lat: event.lat,
            long: event.long,
            start: event.start,
            time: event.time
          }
        }).then(
          this.setState(prevState => ({
            liked: [...prevState.liked, id]
          }))
        );
      }
    }
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:5000/api/events"
    }).then(res => {
      const activity = res.data;
      this.setState({ activity });
      console.log(activity);
    });
  }

  renderMap() {}
  render() {
    return (
      <div className="container">
        <Collapsed
          adventure={this.state.activity.map((activity, index) => {
            const icon = this.state.liked.includes(activity._id) ? (
              <Icon className="star" small>star</Icon>
            ) : (
              <Icon className="star" small>star_border</Icon>
            );
            if (activity.catagory === "Adventure") {
              return (
                <div className="col s6">
                  <CardPanel                     style={{
                      padding: "24px",
                      borderTopColor: "#795548",
                      borderTopStyle: "solid",
                      borderTopWidth: "5px",
                      backgroundColor: "#fafafa",
                    }}>
                    <div className="row">
                      <div className="col s6">
                        <span className="teal-text"
                          style={{                           
                            fontWeight: "bold"
                          }}
                        >
                          {activity.name}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight:"bold"}}>Description: </span>
                        <span style={{ color: "black" }}>
                          {activity.description}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight:"bold"}}>Advice: </span>
                        <span style={{ color: "black" }}>
                          {activity.advice}
                        </span>
                      </div>
                      <div className="col s6">
                        <span />
                        <img
                          style={{ width: 150, height: 150 }}
                          src={activity.img}
                        />
                        <a
                          id={activity._id}
                          className="right"
                          key={activity._id}
                          onClick={this.handleChange.bind(
                            this,
                            activity._id,
                            activity
                          )}
                        >
                          {icon}
                        </a>
                      </div>
                    </div>
                  </CardPanel>
                </div>
              );
            }
          })}
          dining={this.state.activity.map((activity, index) => {
            const icon = this.state.liked.includes(activity._id) ? (
              <Icon className="star" small>star</Icon>
            ) : (
              <Icon className="star" small>star_border</Icon>
            );
            if (activity.catagory === "Dining") {
              return (
                <div className="col s6">
                  <CardPanel style={{
                      padding: "24px",
                      borderTopColor: "#795548",
                      borderTopStyle: "solid",
                      borderTopWidth: "5px",
                      backgroundColor: "#fafafa",
                    }}>
                    <div className="row">
                      <div className="col s6">
                        <span className="teal-text"
                          style={{
                            fontWeight: "bold"
                          }}
                        >
                          {activity.name}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight:"bold"}}>Description: </span>
                        <span style={{ color: "black" }}>
                          {activity.description}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight:"bold"}}>Advice: </span>
                        <span style={{ color: "black" }}>
                          {activity.advice}
                        </span>
                      </div>
                      <div className="col s6">
                        <span />
                        <img
                          style={{ width: 150, height: 150 }}
                          src={activity.img}
                        />
                        <a
                          id={activity._id}
                          className="right"
                          key={activity._id}
                          onClick={this.handleChange.bind(
                            this,
                            activity._id,
                            activity
                          )}
                        >
                          {icon}
                        </a>
                      </div>
                    </div>
                  </CardPanel>
                </div>
              );
            }
          })}
          entertainment={this.state.activity.map((activity, index) => {
            const icon = this.state.liked.includes(activity._id) ? (
              <Icon className="star" small>star</Icon>
            ) : (
              <Icon className="star" small>star_border</Icon>
            );
            if (activity.catagory === "Entertainment") {
              return (
                <div className="col s6">
                  <CardPanel style={{
                      padding: "24px",
                      borderTopColor: "#795548",
                      borderTopStyle: "solid",
                      borderTopWidth: "5px",
                      backgroundColor: "#fafafa",
                    }}>
                    <div className="row">
                      <div className="col s6">
                        <span className="teal-text"
                          style={{
                            fontWeight: "bold"
                          }}
                        >
                          {activity.name}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight:"bold"}}>Description: </span>
                        <span style={{ color: "black" }}>
                          {activity.description}
                        </span>
                        <br />

                        <span style={{ color: "black", fontWeight:"bold"}}>Advice: </span>
                        <span style={{ color: "black" }}>
                          {activity.advice}
                        </span>
                      </div>
                      <div className="col s6">
                        <span />
                        <img
                          style={{ width: 150, height: 150 }}
                          src={activity.img}
                        />
                        <a
                          id={activity._id}
                          className="right"
                          key={activity._id}
                          onClick={this.handleChange.bind(
                            this,
                            activity._id,
                            activity
                          )}
                        >
                          {icon}
                        </a>
                      </div>
                    </div>
                  </CardPanel>
                </div>
              );
            }
          })}
        />
      </div>
    );
  }
}
export default Second;
