import { Component } from 'react'

export default class Polyline extends Component {

  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). 
  // This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  rainbowStop(h) {
    let f = (n, k = (n + h * 12) % 12) => .5 - .5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    let rgb2hex = (r, g, b) => "#" + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, 0)).join('');
    return (rgb2hex(f(0), f(8), f(4)));
  }

  renderPolylines() {
    const { markers, map, maps } = this.props
    //const randomColor = this.rainbowStop(Math.random())

    /** Example of rendering geodesic polyline */
    /*let geodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: true,
      strokeColor: '#e4e4e4',
      strokeOpacity: 1.0,
      strokeWeight: 4
    })
    geodesicPolyline.setMap(map)*/

    /** Example of rendering non geodesic polyline (straight line) */
    let nonGeodesicPolyline = new maps.Polyline({
      path: markers,
      geodesic: false,
      strokeColor: '#00a1e1',
      //strokeColor: randomColor,
      strokeOpacity: 0.7,
      strokeWeight: 3
    })
    nonGeodesicPolyline.setMap(map)
  }

  render() {
    this.renderPolylines()
    return null
  }
}
