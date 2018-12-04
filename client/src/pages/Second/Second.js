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
      liked: []
    };
  }

  // handles favorite button
  handleChange(id, event) {
    const { liked } = this.state;
    console.log(event);
    console.log("is" + liked.length)

    // if (typeof liked === "object") {
      // if button has already been clicked
      if (liked.includes(id)) {
        // for (var i = 0; i < liked.length; i++) {
        //   if (liked[i] === id) {
        //     liked.splice(i, 1);
        //   }

        liked.forEach(function(like, index){
          if (like === id) {
            liked.splice(index, 1);
            console.log("ooooo" + liked.length)
          }
        })
        
        // delete it from user favorites
        axios({
          method: "put",
          url: "/api/delete",
          data: {
            username: sessionStorage.getItem("user"),
            name: event.name
          }
        });

        axios({
          method: "put",
          url: "/api/itinerary/delete",
          data: {
            username: sessionStorage.getItem("user"),
            id: event._id
          }
        }).then(this.setState({ liked: liked }));

        // if not found
      } else {
        console.log(sessionStorage.getItem("user"));
        console.log(event.name);

        // add it to user favorites
        axios({
          method: "put",
          url: "/api/users",
          data: {
            username: sessionStorage.getItem("user"),
            name: event.name,
            lat: event.lat,
            long: event.long,
            start: event.start,
            time: event.time,
            kind: "local",
            id: event._id
          }
        }).then(
          this.setState(prevState => ({
            liked: [...prevState.liked, event._id]
          })),
          console.log("id" + event._id)
        );
      
    }
  }

  // get all local favorites/activities
  componentDidMount() {
    // searches users favorites to see if they already liked any
    axios({
      method: "put",
      url: "/api/favorites",
      data: {
        username: sessionStorage.getItem("user")
      }
      // stores already favorited
    })
    // remembers previous likes
      .then(res => {
        const rememberedFavorites = res.data.favorites;
        const liked = [];
        rememberedFavorites.forEach((activity, index) => {
          // console.log(activity);
          liked.push(activity.id);
        });
        this.setState({ liked });
        // console.log(liked);
      })
      .then(() => {
        axios({
          method: "get",
          url: "/api/events"
        }).then(res => {
          const activity = res.data;
          this.setState({ activity });
          console.log(activity);
        });
      });
  }

  render() {
    return (
      <div className="container">
        <Collapsed
          // maps throught the activity
          adventure={this.state.activity.map((activity, index) => {
            const icon = this.state.liked.includes(activity._id) ? (
              <Icon className="star" small>
                star
              </Icon>
            ) : (
              <Icon className="star" small>
                star_border
              </Icon>
            );
            // if category === adventure
            if (activity.catagory === "Adventure") {
              return (
                <div className="col s6">
                  <CardPanel
                    style={{
                      padding: "24px",
                      borderTopColor: "#795548",
                      borderTopStyle: "solid",
                      borderTopWidth: "5px",
                      backgroundColor: "#fafafa"
                    }}
                  >
                    <div className="row">
                      <div className="col s6">
                        <span
                          className="teal-text"
                          style={{
                            fontWeight: "bold"
                          }}
                        >
                          {activity.name}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Description:{" "}
                        </span>
                        <span style={{ color: "black" }}>
                          {activity.description}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Advice:{" "}
                        </span>
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
          // maps throught the activity
          dining={this.state.activity.map((activity, index) => {
            const icon = this.state.liked.includes(activity._id) ? (
              <Icon className="star" small>
                star
              </Icon>
            ) : (
              <Icon className="star" small>
                star_border
              </Icon>
            );

            // if category === dining
            if (activity.catagory === "Dining") {
              return (
                <div className="col s6">
                  <CardPanel
                    style={{
                      padding: "24px",
                      borderTopColor: "#795548",
                      borderTopStyle: "solid",
                      borderTopWidth: "5px",
                      backgroundColor: "#fafafa"
                    }}
                  >
                    <div className="row">
                      <div className="col s6">
                        <span
                          className="teal-text"
                          style={{
                            fontWeight: "bold"
                          }}
                        >
                          {activity.name}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Description:{" "}
                        </span>
                        <span style={{ color: "black" }}>
                          {activity.description}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Advice:{" "}
                        </span>
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
          // maps throught the activity
          entertainment={this.state.activity.map((activity, index) => {
            const icon = this.state.liked.includes(activity._id) ? (
              <Icon className="star" small>
                star
              </Icon>
            ) : (
              <Icon className="star" small>
                star_border
              </Icon>
            );

            // if category === entertainment
            if (activity.catagory === "Entertainment") {
              return (
                <div className="col s6">
                  <CardPanel
                    style={{
                      padding: "24px",
                      borderTopColor: "#795548",
                      borderTopStyle: "solid",
                      borderTopWidth: "5px",
                      backgroundColor: "#fafafa"
                    }}
                  >
                    <div className="row">
                      <div className="col s6">
                        <span
                          className="teal-text"
                          style={{
                            fontWeight: "bold"
                          }}
                        >
                          {activity.name}
                        </span>
                        <br />
                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Description:{" "}
                        </span>
                        <span style={{ color: "black" }}>
                          {activity.description}
                        </span>
                        <br />

                        <span style={{ color: "black", fontWeight: "bold" }}>
                          Advice:{" "}
                        </span>
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
