import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';

let latitude = 59.33258;
let longitude = 18.0649;

const GoMapsKey = `${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

// Stockholm
// "lat": 59.33258,
// "lng": 18.0649,

// Åre
// "lat": 63.40109,
// "lng": 13.08222,

// Falun
// "lat": 60.60357,
// "lng": 15.62597,

// Rome
// "lat": 41.90133,
// "lng": 12.5009,

export class MapContainer extends Component {

  getCoordinates = () => {
    const searchResponse = this.props.searchResponse;
    if (searchResponse && Array.isArray(searchResponse.places) && searchResponse.places.length >= 2) {
      return {
        latOrigin: searchResponse.places[0].lat,
        lngOrigin: searchResponse.places[0].lng,
        nameOrigin: searchResponse.places[0].shortName,
        latDest: searchResponse.places[1].lat,
        lngDest: searchResponse.places[1].lng,
        nameDest: searchResponse.places[1].shortName,
      };
    }
    return null;
  }
  render() {
    const style = {
      width: '50%',
      height: '50%',
     
    }

    const routeInfo = this.getCoordinates();

    if (!routeInfo) {
      return (null);
    }

    return (
      <Map style={style} google={this.props.google}
        zoom={1.8} initialCenter={{ lat: routeInfo.latDest, lng: routeInfo.lngDest }}
      >

        <Marker
          name={routeInfo.nameDest}
          position={{ lat: routeInfo.latOrigin, lng: routeInfo.lngOrigin }} />
        <Marker />

        {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1> 
          </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (`${GoMapsKey}`)
})(MapContainer)