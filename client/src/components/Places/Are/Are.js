import React, { Component } from 'react';
import "../layout.css"
import imgOffpist from './img/offpist-are-AA-Are2.png'
import imgRockberg from './img/crop_media_1254_foto-ola-rockberg-kabin-1-are.jpg'
import imgStation from './img/station-are.jpg'
import imgInteriorRoom from './img/interior_room_lookin_out_copperhill_480-are.jpg'
import imgAreBjornen from './img/Are_Bjornen_Stugby_20100611_TOJ6225-are.jpg'

class Are extends Component {

  scrollToFooter = (event) => {
    event.preventDefault();
    document.getElementById('footerScrollId').scrollIntoView(true);
  }

  render() {
    return (
      <main className="pl-main-font">
        <h2 className="pl-header-text">Åre - Sweden's leading ski resort</h2>
        {/* Content */}
        <div className="wrapper row2">
          <div className="pl-clear pl-container">
            {/* Main picture */}
            <section>
              <a href="https://en.wikipedia.org/wiki/%C3%85re">
                <img
                  src={imgOffpist}
                  width={960}
                  height={458}
                  alt="Offpist skiing"
                />
              </a>
            </section>
            {/* Main content */}
            <div className="pl-homepage">
              {/* Services */}
              <section className="pl-clear pl-services">
                <article className="one_third">
                  <figure>
                    <img
                      src={imgRockberg}
                      width={290}
                      height={180}
                      alt="Skiing"
                    />
                    <figcaption>
                      <h2>Places to See in Åre</h2>
                      <p>
                        Åre's cable car takes you up to 1274 MASL, making
                        it the highest accessible mountain in
                        Sweden.
                      </p>
                      <footer className="more">
                        <a href="/" onClick={this.scrollToFooter}>Read More »</a>
                      </footer>
                    </figcaption>
                  </figure>
                </article>
                <article className="one_third">
                  <figure>
                    <img
                      src={imgStation}
                      width={290}
                      height={180}
                      alt="Skiing station"
                    />
                    <figcaption>
                      <h2>Transport</h2>
                      <p>There is a local transport system in the city. From where you can travel to rest of Sweden</p>
                      <footer className="more">
                        <a href="/" onClick={this.scrollToFooter}>Read More »</a>
                      </footer>
                    </figcaption>
                  </figure>
                </article>
                <article className="one_third lastbox">
                  <figure>
                    <img
                      src={imgInteriorRoom}
                      width={290}
                      height={180}
                      alt="Interior of hotel room"
                    />
                    <figcaption>
                      <h2>Places to stay in Åre</h2>
                      <p>
                        You can choose from many hotels to stay at in Åre. Or maybe a cozy cabin in the middle of the slope.
                      </p>
                      <footer className="more">
                        <a href="/" onClick={this.scrollToFooter}>Read More »</a>
                      </footer>
                    </figcaption>
                  </figure>
                </article>
              </section>
              {/* Introduction */}
              <section className="last pl-clear pl-intro">
                <article>
                  <figure>
                    <img
                      src={imgAreBjornen}
                      width={450}
                      height={350}
                      alt="Åre Björnen area"
                    />
                    <figcaption>
                      <h2>About the City of Åre</h2>
                      <p>
                        Åre is a locality and one of the leading
                        Scandinavian ski resorts situated in Åre
                        Municipality, Jämtland County, Sweden with 1,417
                        inhabitants in 2010. 25% of the municipal industry
                        is based on tourism, most notably the downhill
                        skiing and biking resorts in Åre, Duved and
                        Storlien. The growth in tourism has resulted in the
                        development of hotels, recreational and shopping
                        opportunities in the area.
                      </p>
                      <footer className="more">
                        <a href="https://en.wikipedia.org/wiki/%C3%85re">
                          Read More »
                        </a>
                      </footer>
                    </figcaption>
                  </figure>
                </article>
              </section>
              {/* / Introduction */}
            </div>
            {/* / content body */}
          </div>
        </div>
        {/* Footer */}
        <div className="wrapper row3">
          <div id="footerScrollId" className="pl-clear pl-footer">
            {/* Section One */}
            <section className="one_quarter">
              <h2 className="pl-title">About Åre</h2>
              <nav>
                <ul className="place-ul">
                  <li>
                    <a href="/">Welcome to Åre</a>
                  </li>
                  <li>
                    <a href="/">More about Åre</a>
                  </li>
                  <li>
                    <a href="/">Offical website of Åre</a>
                  </li>
                  <li>
                    <a href="/">History of Åre</a>
                  </li>
                  <li className="last">
                    <a href="/">Weather in Åre</a>
                  </li>
                </ul>
              </nav>
            </section>
            {/* Section Two */}
            <section className="one_quarter">
              <h2 className="pl-title">Attractions</h2>
              <nav>
                <ul className="place-ul">
                  <li>
                    <a href="/">Things to do in Åre</a>
                  </li>
                  <li>
                    <a href="/">Sightseeing</a>
                  </li>
                  <li>
                    <a href="/">Attractions in Åre</a>
                  </li>
                  <li>
                    <a href="/">Recommendations from tripadvisor</a>
                  </li>
                  <li className="last">
                    <a href="/">Attractions</a>
                  </li>
                </ul>
              </nav>
            </section>
            {/* Section Three */}
            <section className="one_quarter">
              <h2 className="pl-title">Transport</h2>
              <nav>
                <ul className="place-ul">
                  <li>
                    <a href="/">Local Transport</a>
                  </li>
                  <li>
                    <a href="/">Train service from Stockholm</a>
                  </li>
                  <li>
                    <a href="/">Fly from stockholm</a>
                  </li>
                  <li>
                    <a href="/">Buss service from stockholm</a>
                  </li>
                  <li className="last">
                    <a href="/">Taxi service</a>
                  </li>
                </ul>
              </nav>
            </section>
            {/* Section Four */}
            <section className="one_quarter lastbox">
              <h2 className="pl-title">Accommodation</h2>
              <nav>
                <ul className="place-ul">
                  <li>
                    <a href="/">Holiday club</a>
                  </li>
                  <li>
                    <a href="/">Hotell Granen</a>
                  </li>
                  <li>
                    <a href="/">Hotell Fjällgården</a>
                  </li>
                  <li>
                    <a href="/">Hotel Åregården</a>
                  </li>
                  <li className="last">
                    <a href="/">Copperhill Mountain Lodge</a>
                  </li>
                </ul>
              </nav>
            </section>
            {/* / Section */}
          </div>
        </div>
      </main>
    );
  }
};

export default Are;
