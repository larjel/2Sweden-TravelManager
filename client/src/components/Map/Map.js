import React, { Component } from 'react';
//import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
//<script src="https://maps.googleapis.com/maps/api/js?key="></script>

class Map extends Component {


  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        // googleMapURL={"https://maps.googleapis.com/maps/api/js?key="}
        defaultCenter={{ lat: 59.33258, lng: 18.0649 }}
        defaultZoom={13}
      >
      </GoogleMap>
    ));
    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: '500px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
};
export default Map;

// Stockholm
// "lat": 59.33258,
// "lng": 18.0649,

// Åre
// "lat": 63.40109,
// "lng": 13.08222,

// Falun
// "lat": 60.60357,
// "lng": 15.62597,