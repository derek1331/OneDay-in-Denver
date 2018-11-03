import React from "react";
import "./Third.css";
import { Cardy2 } from "../../components/Card";
import axios from "axios-jsonp-pro";
// import { LikeButton } from "../../components/Button";
import { Icon } from "react-materialize";

class Third extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
      liked: [1],
      meetups: [],
      query: new Date().toISOString().slice(0, 10)
    };
  }

  // Get from meetups API
  runAxios() {
    axios
      .jsonp(
        `https://api.meetup.com/find/upcoming_events?&sign=tru&key=7d3c6c6011422e5e152c5d752564e77&photo-host=public&lon=-104.990&end_date_range=${
          this.state.query
        }T23:59:59&start_date_range=${
          this.state.query
        }T00:00:00&page=20&lat=39.739&order=time`
      )
      .then(res => {
        const meetups = res.data.events;
        this.setState({
          meetups
        });
        console.log(res.data.events);
      });
  }

  // Run axios
  componentWillMount() {
    this.runAxios();
    // axios({
    //   method: "put",
    //   url: "http://localhost:5000/api/favorites",
    //   data: {
    //     username: sessionStorage.getItem("user")
    //   }
    // }).then(res => {
    //   if (res.data.favorites.length >= 1) {
    //     let other = res.data.favorites.map(event => {
    //       return event._id;
    //     });
    //     this.setState({
    //       liked: other
    //     })
    //     console.log(this.state.liked)
    //   } else {
    //     return;
    //   }
    // });
  }

  // Change Date
  renderMeetups = () => {
    let date = document.getElementById("date").value;
    console.log(date);
    if (date) {
      this.setState(
        {
          query: date
        },
        this.runAxios
      );
    } else {
      return;
    }
  };

  handleChange(id, event) {
    const { liked } = this.state;

    if (liked.length >= 1) {
      if (liked.includes(id)) {
        for (var i = 0; i < liked.length; i++) {
          if (liked[i] === id) {
            liked.splice(i, 1);
          }
        }
        axios({
          method: "put",
          url: "http://localhost:5000/api/delete",
          data: {
            username: sessionStorage.getItem("user"),
            name: event.name
          }
        }).then(
          this.setState({
            liked: liked
          })
        );
        // if not found
      } else {
        axios({
          method: "put",
          url: "http://localhost:5000/api/users",
          data: {
            username: sessionStorage.getItem("user"),
            name: event.name,
            start: `${event.local_date}T${event.local_time}`,
            lat: event.venue ? event.venue.lat : "",
            long: event.venue ? event.venue.lon : "",
            time: event.local_time
          }
        }).then(
          this.setState(prevState => ({
            liked: [...prevState.liked, id]
          }))
        );
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <div className="row ">
            <div className="col s6 center-align">
              <span
                style={{
                  fontSize: "2.28rem"
                }}
              >
                Find Meetups in Denver!
              </span>
            </div>
            <div className="col s6 center-align">
              
                <input
                  id="date"
                  type="date"
                  name="bday"
                  style={{
                    width: "50%",
                    fontSize: "2.28rem"
                  }}
                  onChange={this.renderMeetups}
                />
              
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              {this.state.meetups.map((event, index) => {
                function doesExist() {
                  if (event.venue) {
                    return event.venue.name;
                  } else {
                    return "Not Available";
                  }
                }
                const icon = this.state.liked.includes(event.id) ? (
                  <Icon className="star" small>
                    {" "}
                    star{" "}
                  </Icon>
                ) : (
                  <Icon className="star" small>
                    {" "}
                    star_border{" "}
                  </Icon>
                );

                return (
                  <Cardy2
                    key={index}
                    style={{
                      padding: "24px",
                      borderTopColor: "#795548",
                      borderTopStyle: "solid",
                      borderTopWidth: "5px",
                      backgroundColor: "#fafafa",
                      height: "132px"
                    }}
                    class="col s6"
                    namecolor="teal-text"
                    name={event.name}
                    href={event.link}
                    time={event.local_time}
                    location={doesExist()}
                  >
                    <a
                      id={event.id}
                      className="right"
                      key={event._id}
                      onClick={this.handleChange.bind(this, event.id, event)}
                    >
                      {icon}
                    </a>
                  </Cardy2>
                );
              })}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}
export default Third;
