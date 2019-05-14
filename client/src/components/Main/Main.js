import React from 'react'
import "./Main.css";
class Main extends React.Component {
    render() {
        return(
            <main className="content">
            <h3>Choose desired travel route!</h3>
        <form className="formLayout" onSubmit={this.handleSearchSubmit}>
          <input
            /*onChange={e => this.setState({ searchValue1: e.target.value })}*/
            className="input"
            type='text'
            name='search1'
            placeholder='From...'
            required="required"
          />
          <input
           /* onChange={e => this.setState({ searchValue2: e.target.value })}*/
            className="input"
            list="destinations"
            id="destination"
            name='destination'
            placeholder='To...'
            required="required"
          />
          <div className="inputFields">
            {/*
            <label className="label" htmlFor="fromDate">Departure date</label>
            <input
              onChange={e => this.setState({ fromDate: e.target.value })}
              className="input"
              id="fromDate"
              type="date"
              max="2025-01-01" min="2024-01-01"
              required="required">
            </input>
            <label className="label" htmlFor="toDate">Going home date</label>
            <input
              onChange={e => this.setState({ toDate: e.target.value })}
              className="input"
              id="toDate"
              type="date"
              max="2025-01-01" min="2024-01-01"
              required="required">
            </input>
            */}
            <button type="submit" style={{ margin: '0 0 0 190px' }}>Search</button>
            <button type="button" style={{ margin: '0 0 0 20px' }} onClick={this.refreshPage}>New search</button>
          </div>
        </form>
        <datalist id="destinations">
          <option>Stockholm</option>
          <option>Falun</option>
          <option>Are</option>
        </datalist>
        </main>
        )
    }
}


export default Main;