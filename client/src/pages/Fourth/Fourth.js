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
      meetups: [],
      liked: [1],
      button: false,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapstuff: []
    };
  }
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

  // Favorites Button
  handleChange(id, event) {
    // With setState the current and previous states are merged.
    const { liked, mapstuff } = this.state;
    const map = {
      name: event.name,
      lat: event.lat ? event.lat : "",
      lng: event.long ? event.long : "",
      id: event._id
    };
    // if (liked.length === 0) {
    //   this.setState({ liked: id, button: true });
    //   // if found
    // } else
    if (liked.length >= 1) {
      if (liked.includes(id)) {
        for (var i = 0; i < liked.length; i++) {
          if (liked[i] === id) {
            liked.splice(i, 1);
          }
        } if(mapstuff.lat === null) {
          return
      } else {{
        for (var j = 0; j < mapstuff.length; i++) {
          if (mapstuff[j].id === id) {
            mapstuff.splice(j, 1);
          }
        }}}
        this.calendar.getEventById(event._id).remove();

        this.setState({ liked: liked, mapstuff: mapstuff });
        // if not found
      } else {
        this.calendar.addEvent({
          id: event._id,
          title: event.name,
          start: event.start
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
      const meetups = res.data.favorites;
      this.setState({ meetups });
      console.log(meetups);
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
        <div className="section">
          <div className="row">
            <div className="col s6">
              {this.state.meetups.map((event, index) => {
                const icon = this.state.liked.includes(event._id) ? (
                  <Icon  className="star" small>star</Icon>
                ) : (
                  <Icon className="star" small>star_border</Icon>
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
                  
                    // image="https://www.travelwyoming.com/sites/default/files/uploads/consumer/7-18_MedicineBowHikingFishing_KL_0708_3298.jpg"
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
              <div className="google" style={{width: "531.547px", height: "500px"}}>
              <Map
              className="google"
                google={this.props.google}
                zoom={10}
                initialCenter={{ lat: 39.739, lng: -104.99 }}
                style={{width: "531.547px", height: "500px"}}
              >
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
