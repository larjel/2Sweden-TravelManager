import React, { Component } from 'react';
import "../layout.css"
import imgEurSweden from './img/eur-sweden-stockholm.jpg'
import imgStockholmView from './img/stockholm-view.jpg'
import imgForarlosa from './img/forarlosatag.jpg'
import imgStockholmHotelRoom from './img/stockholm-hotel-room.jpg'
import imgStockholm1024x681 from './img/stockholm-1024x681.jpg'

class Stockholm extends Component {

  scrollToFooter = (event) => {
    event.preventDefault();
    document.getElementById('footerScrollId').scrollIntoView(true);
  }

  render() {
    return (
      <main className="pl-main-font">
        <h2 className="pl-header-text">Stockholm - Venice of the north</h2>
        {/* Content */}
        <div className="wrapper row2">
          <div className="pl-clear pl-container">
            {/* Main picture */}
            <section>
              <a href="https://en.wikipedia.org/wiki/Stockholm">
                <img src={imgEurSweden} alt="Stockholm view" />
              </a>
            </section>
            {/* Main content */}
            <div className="pl-homepage">
              {/* Services */}
              <section className="pl-clear pl-services">
                <article className="one_third">
                  <figure>
                    <img src={imgStockholmView} width={290} height={180} alt="Stockholm view" />
                    <figcaption>
                      <h2>Places to See in Stockholm</h2>
                      <p>Stockholm has a lot of Attractions. Visit the Old city and much more.</p>
                      <footer className="more">
                        <a href="/" onClick={this.scrollToFooter}>Read More »</a>
                      </footer>
                    </figcaption>
                  </figure>
                </article>
                <article className="one_third">
                  <figure>
                    <img
                      src={imgForarlosa}
                      width={290}
                      height={180}
                      alt="Stockholm subway"
                    />
                    <figcaption>
                      <h2>Local Transport</h2>
                      <p>Stockholm has a big public transport system.</p>
                      <footer className="more">
                        <a href="/" onClick={this.scrollToFooter}>Read More »</a>
                      </footer>
                    </figcaption>
                  </figure>
                </article>
                <article className="one_third lastbox">
                  <figure>
                    <img
                      src={imgStockholmHotelRoom}
                      width={290}
                      height={180}
                      alt="Stockholm hotel room"
                    />
                    <figcaption>
                      <h2>Places to stay in Stockholm</h2>
                      <p>
                        There is a wide range of Hotels to stay at in Stockholm.
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
                      src={imgStockholm1024x681}
                      width={450}
                      height={350}
                      alt="Stockholm view of Stadshuset"
                    />
                    <figcaption>
                      <h2>About the City of Stockholm</h2>
                      <p>
                        Stockholm is the capital of Sweden and the most
                        populous urban area in the Nordic countries. The
                        city stretches across fourteen islands where Lake
                        Mälaren flows into the Baltic Sea. Outside the city
                        to the east, and along the coast, is the island
                        chain of the Stockholm archipelago. Stockholm is the
                        cultural, media, political, and economic centre of
                        Sweden. The Stockholm region alone accounts for over
                        a third of the country's GDP. It is an important
                        global city and the main centre for corporate
                        headquarters in the Nordic region.
                      </p>
                      <footer className="more">
                        <a href="https://en.wikipedia.org/wiki/Stockholm">
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
              <h2 className="pl-title">About stockholm</h2>
              <nav>
                <ul className="place-ul">
                  <li>
                    <a href="https://en.wikipedia.org/wiki/Stockholm">
                      More About Stockholm
                    </a>
                  </li>
                  <li>
                    <a href="https://www.stockholm.se/">
                      Offical website of Stockholm
                    </a>
                  </li>
                  <li>
                    <a href="/">History of Stockholm</a>
                  </li>
                  <li>
                    <a href="/">Weather in Stockholm</a>
                  </li>
                  <li className="last">
                    <a href="/">Night life in Stockholm</a>
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
                    <a href="https://www.visitstockholm.com/">
                      Things to do in Stockholm
                    </a>
                  </li>
                  <li>
                    <a href="https://www.stromma.com/sv-se/stockholm/sightseeing/?gclid=EAIaIQobChMItbnjq6Kx4gIVUy4YCh076g6CEAAYASAAEgKtGfD_BwE">
                      Sightseeing
                    </a>
                  </li>
                  <li>
                    <a href="https://www.tripadvisor.com/Attractions-g189852-Activities-Stockholm.html">
                      Recommendations from Tripadvisor
                    </a>
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
                    <a href="https://sl.se/">Local Transport</a>
                  </li>
                  <li>
                    <a href="https://www.arlandaexpress.com/">
                      Train service for Arlanda Airport
                    </a>
                  </li>
                  <li>
                    <a href="https://www.flygbussarna.se/">
                      Buss Services to Airports
                    </a>
                  </li>
                  <li>
                    <a href="https://www.sj.se/">
                      Train service to other Cities
                    </a>
                  </li>
                  <li className="last">
                    <a href="https://www.taxistockholm.se/en/">
                      Taxi Services
                    </a>
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
                    <a href="https://www.sheratonstockholm.se/">
                      Sheraton Stockholm
                    </a>
                  </li>
                  <li>
                    <a href="https://www.scandichotels.com/hotels/sweden/stockholm">
                      Scandic hotels Stockholm
                    </a>
                  </li>
                  <li>
                    <a href="https://www.grandhotel.se/en">
                      Grand hotel Stockholm
                    </a>
                  </li>
                  <li>
                    <a href="https://www.hiltonhotels.com/sv_SE/sverige/hilton-stockholm-slussen/">
                      Hilton hotel Stockholm
                    </a>
                  </li>
                  <li className="last">
                    <a href="https://www.elite.se/en/hotels/stockholm/hotel-stockholm-plaza/">
                      Elite hotel Stockholm
                    </a>
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

export default Stockholm;
