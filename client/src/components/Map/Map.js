import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  windowHasClosed = (props) => {
      this.setState({
        showingInfoWindow: false,
      })
    }


  render() {
    return (
      <Map google={this.props.google} zoom={14}
      initialCenter={{lat: 39.739, lng: -104.990}} >
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow
          onOpen={this.windowHasOpened}
          onClose={this.windowHasClosed}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}
  
   
export default GoogleApiWrapper({
    apiKey: "AIzaSyBhNoh-8XLeci7x7IWHfIGXuxcp1djJfq8"
})(MapContainer);