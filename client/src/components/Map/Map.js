import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import decodePolyline from 'decode-google-map-polyline';
import Marker from './Marker'
import "./Map.css"

const GOOGLE_MAPS_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;

let markers = [];
let nonGeodesicPolyline = null;

//----------------------------------------------------------------------------
class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      mapsLoaded: false,
      map: null,
      maps: null,
    }
  }

  //--------------------------------------------------------------------------
  onMapLoaded = (map, maps) => {
    this.fitBounds(map, maps)

    this.setState({
      ...this.state,
      mapsLoaded: true,
      map: map,
      maps: maps
    })
  }

  //--------------------------------------------------------------------------
  fitBounds = (map, maps) => {
    var bounds = new maps.LatLngBounds()
    for (let marker of markers) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }

  //--------------------------------------------------------------------------
  fitBoundsCallback = () => {
    if (this.state.map && this.state.maps) {
      this.fitBounds(this.state.map, this.state.maps);
    }
  }
  //--------------------------------------------------------------------------
  fitBoundsUpdate = () => {
    if (this.state.map && this.state.maps) {
      setTimeout(this.fitBoundsCallback, 200);
    }
  }

  //--------------------------------------------------------------------------
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). 
  // This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  rainbowStop(h) {
    let f = (n, k = (n + h * 12) % 12) => .5 - .5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    let rgb2hex = (r, g, b) => "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join('');
    return (rgb2hex(f(0), f(8), f(4)));
  }

  //--------------------------------------------------------------------------
  // Render non geodesic polyline (straight line) */
  renderPolylines = (map, maps) => {

    nonGeodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: false,
      strokeColor: '#00a1e1',
      strokeOpacity: 0.7,
      strokeWeight: 4
    })
    nonGeodesicPolyline.setMap(map)
  }

  //--------------------------------------------------------------------------
  // Clear the previous polylines from the map
  clearPolylines = () => {
    if (nonGeodesicPolyline) {
      nonGeodesicPolyline.setMap(null);
    }
  }

  //--------------------------------------------------------------------------
  createDepDestDataObject = (places, index) => {
    return {
      text: places[index].shortName,
      lat: places[index].lat,
      lng: places[index].lng
    }
  }

  //--------------------------------------------------------------------------
  showSingleSegment = (searchResponse, routeDetailsArrIdx, routeSegmentArrIdx, mapData) => {
    if (Array.isArray(searchResponse.routes[routeDetailsArrIdx].segments)) {
      this.clearPolylines();
      const segment = searchResponse.routes[routeDetailsArrIdx].segments[routeSegmentArrIdx];
      const depPlaceIdx = segment.depPlace;
      const arrPlaceIdx = segment.arrPlace;
      if (segment.path) {
        mapData.markerData = decodePolyline(segment.path);
      } else { // Just use point-to-point coordinates
        mapData.markerData = [
          { lat: searchResponse.places[depPlaceIdx].lat, lng: searchResponse.places[depPlaceIdx].lng },
          { lat: searchResponse.places[arrPlaceIdx].lat, lng: searchResponse.places[arrPlaceIdx].lng }
        ];
      }
      mapData.depData = this.createDepDestDataObject(searchResponse.places, depPlaceIdx);
      mapData.destData = this.createDepDestDataObject(searchResponse.places, arrPlaceIdx);
    }
  }

  //--------------------------------------------------------------------------
  showAllSegments = (searchResponse, routeDetailsArrIdx, mapData) => {
    if (Array.isArray(searchResponse.routes[routeDetailsArrIdx].segments)) {
      this.clearPolylines();
      const segments = searchResponse.routes[routeDetailsArrIdx].segments;
      for (let i = 0; i < segments.length; i++) {
        // Does 'path' with encoded polyline data exist?
        if (segments[i].path) {
          mapData.markerData.push(...decodePolyline(segments[i].path));
        } else { // Just use point-to-point coordinates
          const depPlaceIdx = segments[i].depPlace;
          const arrPlaceIdx = segments[i].arrPlace;
          mapData.markerData.push(
            {
              lat: searchResponse.places[depPlaceIdx].lat,
              lng: searchResponse.places[depPlaceIdx].lng
            });
          mapData.markerData.push(
            {
              lat: searchResponse.places[arrPlaceIdx].lat,
              lng: searchResponse.places[arrPlaceIdx].lng
            });
        }
      }
    }
  }

  //--------------------------------------------------------------------------
  parseInputDataForMap = (searchResponse, routeDetailsArrIdx, routeSegmentArrIdx) => {
    const mapData = {
      parsed: false,
      markerData: [],
      depData: { text: null, lat: null, lng: null },
      destData: { text: null, lat: null, lng: null }
    };

    if (searchResponse && Array.isArray(searchResponse.routes) && searchResponse.routes.length > 0
      && Array.isArray(searchResponse.places) && searchResponse.places.length > 0) {

      // Get the main departure and arrival cities and store the coordinates 
      // and names for text markers as defaults (segment may override it)
      const depPlaceIdx = 0;
      const arrPlaceIdx = (searchResponse.places.length > 1) ? 1 : 0;

      mapData.depData = this.createDepDestDataObject(searchResponse.places, depPlaceIdx);
      mapData.destData = this.createDepDestDataObject(searchResponse.places, arrPlaceIdx);
      // =================

      if (routeDetailsArrIdx >= 0 && routeSegmentArrIdx >= 0) {
        // A row in the detailed search result table has been clicked, show single segment
        this.showSingleSegment(searchResponse, routeDetailsArrIdx, routeSegmentArrIdx, mapData);
      } else if (routeDetailsArrIdx >= 0) {
        // A row in the main search result table has been clicked, show complete route (all segements)
        this.showAllSegments(searchResponse, routeDetailsArrIdx, mapData);
      } else {
        // No row in a table has been clicked yet, just show departure and destination locations
        this.clearPolylines();
        mapData.markerData = [
          { lat: mapData.depData.lat, lng: mapData.depData.lng },
          { lat: mapData.destData.lat, lng: mapData.destData.lng }
        ];
      }

      mapData.parsed = true;

      this.fitBoundsUpdate(); // Update the bounds and thus also the zoom of the map
    }

    return mapData;
  }

  //--------------------------------------------------------------------------
  render() {

    const { searchResponse, routeDetailsArrIdx, routeSegmentArrIdx } = this.props;
    const { parsed, markerData, depData, destData } = this.parseInputDataForMap(searchResponse, routeDetailsArrIdx, routeSegmentArrIdx);

    if (!parsed) {
      return (null)
    }

    markers = markerData;

    return (
      <div className="google-map-style">
        <GoogleMap
          bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
          yesIWantToUseGoogleMapApiInternals={true}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.onMapLoaded(map, maps)}>
          <Marker text={depData.text} lat={depData.lat} lng={depData.lng} background='#00a1e1' />
          <Marker text={destData.text} lat={destData.lat} lng={destData.lng} background='#248735' />
          {this.state.mapsLoaded ? this.renderPolylines(this.state.map, this.state.maps) : ''}
        </GoogleMap>
      </div>
    )
  }
}

//----------------------------------------------------------------------------
Map.defaultProps = {
  center: [59.33258, 18.0649],
  zoom: 4
}

//----------------------------------------------------------------------------
export default Map;
