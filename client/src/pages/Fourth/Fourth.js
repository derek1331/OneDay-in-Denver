import React from "react";
import "./Fourth.css";
import { Cardy, Cardy4 } from "../../components/Card";
import axios from "axios-jsonp-pro";
import { Calendar } from "fullcalendar";
import { Icon } from "react-materialize";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  google
} from "google-maps-react";

// var pinColor = "FE7569";

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

class Fourth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      liked: [],
      calendar: [],
      button: false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapstuff: []
    };
  }

  // handles when red google maps marker is clicked
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  windowHasClosed = props => {
    this.setState({
      showingInfoWindow: false
    });
  };

  // handles favorites Button
  handleChange(id, event) {
    const { liked, mapstuff } = this.state;

    // creates object for map
    const map = {
      name: event.name,
      lat: event.lat ? event.lat : "",
      lng: event.long ? event.long : "",
      id: event.id,
      color: event.color
    };

    // if button has already been clicked
    if (liked.includes(event.id)) {
      // for (var i = 0; i < liked.length; i++) {
      // if (liked[i] === event.id) {
      //   liked.splice(i, 1);
      // }
      // }
      liked.forEach(function(like, index) {
        if (like === event.id) {
          liked.splice(index, 1);
        }
      });
      // if there isn't a location for event, return
      if (mapstuff.lat === null) {
        return;
        // if there is, remove it from the map
      } else {
        // for (var j = 0; j < mapstuff.length; j++) {
        //   if (mapstuff[j].id === event.id) {
        //     mapstuff.splice(j, 1);
        //   }
        // }

        mapstuff.forEach(function(marker, index) {
          if (marker.id === event.id) {
            mapstuff.splice(index, 1);
          }
        });
      }
      // delete it from itinerary
      axios({
        method: "put",
        url: "/api/itinerary/delete",
        data: {
          username: sessionStorage.getItem("user"),
          id: event.id
        }
      });
      // delete it from map
      axios({
        method: "put",
        url: "/api/maps/delete",
        data: {
          username: sessionStorage.getItem("user"),
          id: event.id
        }
      }).then(
        // remove it from the calendar
        this.calendar.getEventById(event.id).remove(),

        this.setState({ liked: liked, mapstuff: mapstuff })
      );

      // if not found add it the calendar
    } else {
      axios({
        method: "put",
        url: "/api/itinerary",
        data: {
          username: sessionStorage.getItem("user"),
          id: event.id,
          title: event.name,
          start:
            event.kind === "local"
              ? todaysDate.toIsoString().slice(0, 10) +
                "T" +
                document.getElementById("time").value
              : event.start
        }
      })
        .then(
          console.log(event.lat),
          // add to
          axios({
            method: "put",
            url: "/api/maps",
            data: {
              username: sessionStorage.getItem("user"),
              id: event.id,
              name: event.name,
              lat: event.lat ? event.lat : "",
              lng: event.long ? event.long : "",
              color: event.color
            }
          })
        )
        .then(
          this.calendar.addEvent({
            id: event.id,
            title: event.name,
            // if the event is a meetup or localfavorite
            start:
              // if local event splice together
              event.kind === "local"
                ? todaysDate.toIsoString().slice(0, 10) +
                  "T" +
                  document.getElementById("time").value
                : event.start
          }),
          this.setState(prevState => ({
            liked: [...prevState.liked, event.id],
            button: true,
            mapstuff: [...prevState.mapstuff, map]
          }))
        );
    }
  }

  handleDelete(id, activity) {

    // destructuting
    const { liked, mapstuff, event } = this.state;

    if (liked.includes(activity.id)) {
      this.calendar.getEventById(activity.id).remove();
    }

    // finds and deletes element in event array
    event.forEach(function(item, index) {
      if (item.id === activity.id) {
        event.splice(index, 1);
      }
    });

    // if it doesnt have a marker
    if (mapstuff.lat === null) {
      return;
      // if there is, remove it from the map
    } else {
      mapstuff.forEach(function(marker, index) {
        if (marker.id === activity.id) {
          mapstuff.splice(index, 1);
        }
      });
    }

    axios({
      method: "put",
      url: "/api/delete",
      data: {
        username: sessionStorage.getItem("user"),
        name: activity.name
      }
    });

    // delete it from itinerary
    axios({
      method: "put",
      url: "/api/itinerary/delete",
      data: {
        username: sessionStorage.getItem("user"),
        id: activity.id
      }
    });
    // delete it from map
    axios({
      method: "put",
      url: "/api/maps/delete",
      data: {
        username: sessionStorage.getItem("user"),
        id: activity.id
      }
    }).then(
      // set state
      this.setState({ liked, mapstuff, event })
    );
  }

  componentDidMount() {
    // console.log(todaysDate.toIsoString().slice(0, 10))

    axios({
      method: "put",
      url: "/api/favorites",
      data: {
        username: sessionStorage.getItem("user")
      }
      // stores already favorited
    }).then(res => {
      console.log(res.data.itinerary);
      const rememberedFavorites = res.data.itinerary;
      const rememberedMaps = res.data.map;
      console.log(rememberedMaps);
      const liked = [];
      const mapstuff = [];
      const event = res.data.favorites;
      console.log(event);

      // star and itenerary
      rememberedFavorites.forEach((activity, index) => {
        // console.log(activity);
        // star
        liked.push(activity.id);
        // calendar
        // itinerary
        this.calendar.addEvent({
          id: activity.id,
          title: activity.title,
          start: activity.start
        });
      });
      // google maps
      rememberedMaps.forEach((activity, index) => {
        const savedMap = {
          id: activity.id,
          name: activity.name,
          lat: activity.lat,
          lng: activity.lng,
          color: activity.color
        };
        mapstuff.push(savedMap);
        console.log(mapstuff);
      });
      // const mapHelp = this.calendar.getEventSourceById(activity.id);

      // console.log(mapHelp);

      // get all calendar events by id and if none of them match an it in itinerry remove
      // calendar.push({
      //   id: activity.id,
      //   title: activity.title,
      //   start: activity.start
      //     })

      this.setState({ liked, mapstuff, event });
      // console.log(liked);
    });


    var calendarEl = document.getElementById("calendar"); // grab element reference

    this.calendar = new Calendar(calendarEl, {
      // put your options and callbacks here
      defaultView: "listDay",
      allDaySlot: false,
      nowIndicator: true,
      buttonText: {
        today: "today",
        month: "month",
        week: "week",
        day: "day",
        list: "list"
      },
      columnHeader: false,
      events: this.state.calendar
    });
    this.calendar.render();
    console.log(this.calendar);
  }

  render() {
    return (
      <div className="container">
        <style>
          {`
              #height {
                height: 500px  !important;
                }
            `}
        </style>
        <div className="section">
          <div className="row">
            <div className="col s6">
              {/* maps through events */}
              {this.state.event.map((event, index) => {
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
                  <Cardy
                    key={index}
                    color="white"
                    name={event.name}
                    namecolor="teal-text"
                    description={
                      event.kind === "local" ? (
                        <input id="time" defaultValue="10:30" type="time" />
                      ) : (
                        event.time
                      )
                    }
                    style={{
                      padding: "24px",
                      borderTopColor: "#795548",
                      borderTopStyle: "solid",
                      borderTopWidth: "5px",
                      backgroundColor: "#fafafa"
                    }}
                  >
                    <a
                      id={event._id}
                      className="right"
                      key={event._id}
                      onClick={this.handleChange.bind(this, event._id, event)}
                      // style={{color: event.color}}
                    >
                      {icon}
                    </a>
                    <a
                      id={event._id}
                      className="right"
                      key={event._id + 1}
                      onClick={this.handleDelete.bind(this, event._id, event)}
                      // style={{color: event.color}}
                    >
                      <Icon className="close" small>
                        close
                      </Icon>{" "}
                    </a>
                  </Cardy>
                );
              })}
            </div>
            <div className="col s6 center">
              <Cardy4>
                <div id="calendar"> </div>
              </Cardy4>
              <div
                id="height"
                className="google"
                style={{ width: "1px", height: "500px!important" }}
              >
                <Map
                  google={this.props.google}
                  className="google"
                  google={this.props.google}
                  zoom={10}
                  initialCenter={{ lat: 39.739, lng: -104.99 }}
                  style={{ width: "531.547px", height: "500px" }}
                >
                  {/* maps through mapstuff :) */}
                  {this.state.mapstuff.map((event, index) => {
                    // let iconii = Document.createElement("<Icon className='star' small>star</Icon>")
                    return (
                      <Marker
                        key={index}
                        onClick={this.onMarkerClick}
                        name={event.name}
                        position={{ lat: event.lat, lng: event.lng }}
                        // icon={{
                        //   url: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"${pinColor}`,
                        //   scaledSize: new this.props.google.maps.Size(90, 42)

                        // }}
                        // linecolor= {pinColor}
                      />
                    );
                  })}

                  <InfoWindow
                    onOpen={this.windowHasOpened}
                    onClose={this.windowHasClosed}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                  >
                    <div>
                      <span>{this.state.selectedPlace.name}</span>
                    </div>
                  </InfoWindow>
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: `AIzaSyAzIUbLvB6jFBVzcUt0g4aoBTFv_gTEK20`
})(Fourth);
