import React from "react";
import "./Third.css";
import { Cardy2 } from "../../components/Card";
import axios from "axios-jsonp-pro";
import { Icon } from "react-materialize";

// Mountain Time
Date.prototype.toIsoString = function() {
  var tzo = -this.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function(num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? "0" : "") + norm;
    };
  return (
    this.getFullYear() +
    "-" +
    pad(this.getMonth() + 1) +
    "-" +
    pad(this.getDate()) +
    "T" +
    pad(this.getHours()) +
    ":" +
    pad(this.getMinutes()) +
    ":" +
    pad(this.getSeconds()) +
    dif +
    pad(tzo / 60) +
    ":" +
    pad(tzo % 60)
  );
};

var todaysDate = new Date();

// 24hr time to 12hr time

function tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}



class Third extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: [],
      liked: [],
      meetups: [],
      query: todaysDate.toIsoString().slice(0, 10)
    };
  }

  // get meetups from meetups api
  componentWillMount() {
    console.log(todaysDate.toIsoString().slice(0, 10))

    // searches users favorites to see if they already liked any
    axios({
      method: "put",
      url: "/api/favorites",
      data: {
        username: sessionStorage.getItem("user")
      }
    })
      .then(res => {
        // stores already favorited
        const alreadyFavorited = res.data.favorites;
        const liked = [];
        //maps through alreaydyFavorited and pushedes each id to liked array
        alreadyFavorited.forEach(function(activity, index) {
          // console.log(activity);
          liked.push(activity.id);
        });
        // sets state of liked to liked array
        this.setState({ liked });
        // console.log(liked);
      })
      .then(() => {
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
      });
  }

  renderMeetups = () => {
    let date = document.getElementById("date").value;
    console.log(date);
    if (date) {
      this.setState(
        {
          query: date
        },
        () => {
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
      );
    } else {
      return;
    }
  };

  // handles favorites Button
  handleChange(id, event) {

    const { liked } = this.state;

    // if (liked.length >= 1) {
      if (liked.includes(id)) {
        // for (var i = 0; i < liked.length; i++) {
        //   // if button has already been clicked
        //   if (liked[i] === id) {
        //     liked.splice(i, 1);
        //   }
        // }
        liked.forEach(function(like, index) { 
          if (like === id) {
            liked.splice(index , 1);
        }})
        // delete meetup from user favorites
        axios({
          method: "put",
          url: "/api/delete",
          data: {
            username: sessionStorage.getItem("user"),
            name: event.name
          }
        })
        axios({
          method: "put",
          url: "/api/itinerary/delete",
          data: {
            username: sessionStorage.getItem("user"),
            id: event.id
          }
        }).then(
          this.setState({
            liked: liked
          }),
          window.Materialize.toast(`${event.name} has been removed`, 900),
          // window.Materialize.toast("<p><span class='toast-name'>"+event.name+"</span><span> has been removed</span></p>"),


        );
        // if not found
      } else {
        // add meetup to user favorites
        axios({
          method: "put",
          url: "/api/users",
          data: {
            username: sessionStorage.getItem("user"),
            name: event.name,
            start: `${event.local_date}T${event.local_time}`,
            lat: event.venue ? event.venue.lat : "",
            long: event.venue ? event.venue.lon : "",
            time:   tConvert (event.local_time,),
            kind: "meetup",
            id: event.id
          }
        }).then(
          this.setState(prevState => ({
            liked: [...prevState.liked, event.id]
          })),
          window.Materialize.toast(`${event.name} has been added`, 900),
          console.log("id" + event.id)
        );
      
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
              {/* maps through meetups */}
              {
                // if none available
              }{" "}
              {this.state.meetups.length > 0 ? (
                this.state.meetups.map((event, index) => {
                  function doesExist() {
                    if (event.venue) {
                      return event.venue.name;
                    } else {
                      return "Not Available";
                    }
                  }
                  const icon = this.state.liked.includes(event.id) ? (
                    <Icon className="star" small>
                      star
                    </Icon>
                  ) : (
                    <Icon className="star" small>
                      star_border
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
                      time={tConvert(event.local_time)}
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
                })
              ) : (
                <h5 className="center">
                  Sorry there are no more Meetups today
                </h5>
              )}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}
export default Third;
