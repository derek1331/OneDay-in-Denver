import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}
        initialCenter={{lat: 39.9626, lng: -76.7277}} >

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
        <Marker name={'test marker'}
          position={{lat:39.948765, lng: -76.671208}}/>

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>test</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
  
   
export default GoogleApiWrapper({
    apiKey: "AIzaSyBhNoh-8XLeci7x7IWHfIGXuxcp1djJfq8"
})(MapContainer);
