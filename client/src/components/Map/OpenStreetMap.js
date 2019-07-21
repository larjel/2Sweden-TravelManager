import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import decodePolyline from 'decode-google-map-polyline';
import "./OpenStreetMap.css"

let markers = [];

class OpenStreetMap extends React.Component {

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
        mapData.markerData = [
          { lat: mapData.depData.lat, lng: mapData.depData.lng },
          { lat: mapData.destData.lat, lng: mapData.destData.lng }
        ];
      }

      mapData.parsed = true;
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
      <LeafletMap
        bounds={[[depData.lat, depData.lng], [destData.lat, destData.lng]]}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={false}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[depData.lat, depData.lng]}>
          <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
            <span>{depData.text}</span>
          </Tooltip>
        </Marker>
        <Marker position={[destData.lat, destData.lng]}>
          <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>
            <span>{destData.text}</span>
          </Tooltip>
        </Marker>
        <Polyline positions={markers}>
        </Polyline>
      </LeafletMap>
    );
  }
}

export default OpenStreetMap
