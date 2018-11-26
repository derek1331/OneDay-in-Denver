import React from "react";
import "./Fourth.css";
import { Cardy, Cardy4 } from "../../components/Card";
import axios from "axios-jsonp-pro";
import { Calendar } from "fullcalendar";
import { Icon } from "react-materialize";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class Fourth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [],
      liked: [1],
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
      id: event._id
    };
    if (liked.length >= 1) {
      // if button has already been clicked
      if (liked.includes(id)) {
        for (var i = 0; i < liked.length; i++) {
          if (liked[i] === id) {
            liked.splice(i, 1);
          }
        }
        // if there isn't a location for event, return
        if (mapstuff.lat === null) {
          return;
          // if there is, remove it from the map
        } else {
          {
            for (var j = 0; j < mapstuff.length; j++) {
              if (mapstuff[j].id === id) {
                mapstuff.splice(j, 1);
              }
            }
          }
        }

        // remove it from the calendar
        this.calendar.getEventById(event._id).remove();

        this.setState({ liked: liked, mapstuff: mapstuff });
        // if not found add it the calendar
      } else {
        this.calendar.addEvent({
          id: event._id,
          title: event.name,
          // if the event is a meetup or localfavorite
          start:
            event.kind === "local"
              ? new Date().toISOString().slice(0, 10) + event.start
              : event.start
        });
        this.setState(prevState => ({
          liked: [...prevState.liked, id],
          button: true,
          mapstuff: [...prevState.mapstuff, map]
        }));
      }
    }
  }
  componentDidMount() {
    axios({
      method: "put",
      url: "http://localhost:5000/api/favorites",
      data: {
        username: sessionStorage.getItem("user")
      }
    }).then(res => {
      const event = res.data.favorites;
      this.setState({ event });
      console.log(event);
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
      events: [
        // other events here...
      ]
    });

    this.calendar.render();
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
                const icon = this.state.liked.includes(event._id) ? (
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
                    description={event.time}
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
                    >
                      {icon}
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
                  className="google"
                  google={this.props.google}
                  zoom={10}
                  initialCenter={{ lat: 39.739, lng: -104.99 }}
                  style={{ width: "531.547px", height: "500px" }}
                >
                  {/* maps through mapstuff :) */}
                  {this.state.mapstuff.map((event, index) => {
                    return (
                      <Marker
                        key={event.id}
                        onClick={this.onMarkerClick}
                        name={event.name}
                        position={{ lat: event.lat, lng: event.lng }}
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
  apiKey: "AIzaSyBhNoh-8XLeci7x7IWHfIGXuxcp1djJfq8"
})(Fourth);
