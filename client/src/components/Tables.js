import React, { Component } from "react";
import { Table, Button } from "reactstrap";

class Tables extends Component {
  render() {
    return (
      <div className="App container">
        <Table>
          <thead>
            <tr className="table_title">
              <th>Transport</th>
              <th>Time</th>
              <th>Price</th>
              <th>Booking</th>
            </tr>
          </thead>
          <tbody>
            {this.props.places &&
              this.props.places.map(function(place, key) {
                return (
                  <tr className="book_value" key={place.id}>
                    <td>{place.id}</td>
                    <td>{place.title}</td>
                    <td>{place.author}</td>
                    <td>
                      <Button color="success" size="sm">
                        Book
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Tables;
