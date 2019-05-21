import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 


let latitude = 59.33258;
let longitude = 18.0649;


export class MapContainer extends Component {

   
  render() {
    return (
      <Map google={this.props.google} zoom={14}
      
      initialCenter={{
        // lat: 59.33258,
        // lng: 18.0649
        lat: latitude,
        lng: longitude
       }}
       >
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} 
                />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              {/* <h1>{this.state.selectedPlace.name}</h1> */}
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCbCiMpKPJa_nv-puVQPvt05k1bFQMkU_0')
})(MapContainer)



