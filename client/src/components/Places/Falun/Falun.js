import React, { Component } from 'react';
import "../layout.css"
import imgMaxResDefault from './img/maxresdefault-falun2.jpg'
import imgDalarnaMine from './img/dalarna-sweden-mine-falun.jpg'
import imgFalun01 from './img/003722-falun.jpg'
import imgFirstHotel from './img/suite-first-hotel-grand-falun.jpg'
import imgFalun02 from './img/falun.jpg'

class Falun extends Component {

  scrollToFooter = (event) => {
    event.preventDefault();
    document.getElementById('footerScrollId').scrollIntoView(true);
  }

  render() {
    return (
      <main className="pl-main-font">
        <h2 className="pl-header-text">Falun - Northern lights</h2>
        {/* Content */}
        <div className="wrapper row2">
          <div className="pl-clear pl-container">
            {/* Main picture */}
            <section>
              <a href="https://en.wikipedia.org/wiki/Falun">
                <img
                  src={imgMaxResDefault}
                  width={960}
                  height={470}
                  alt="Falun by night"
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
                      src={imgDalarnaMine}
                      width={290}
                      height={180}
                      alt="Mine in Dalarna, Sweden"
                    />
                    <figcaption>
                      <h2>Places to See in falun</h2>
                      <p>
                        The copper mine and mining areas of Falun are part
                        of the world heritage sites.
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
                      src={imgFalun01}
                      width={290}
                      height={180}
                      alt="Falun train station sign"
                    />
                    <figcaption>
                      <h2>Transport</h2>
                      <p>There is a local transport system in the city. It's located at the core of Falun.</p>
                      <footer className="more">
                        <a href="/" onClick={this.scrollToFooter}>Read More »</a>
                      </footer>
                    </figcaption>
                  </figure>
                </article>
                <article className="one_third lastbox">
                  <figure>
                    <img
                      src={imgFirstHotel}
                      width={290}
                      height={180}
                      alt="Hotel room in Falun"
                    />
                    <figcaption>
                      <h2>Places to stay in Falun</h2>
                      <p>
                        You can choose from many hotels to stay at in Falun. Both central and closer to the events.
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
                    <img src={imgFalun02} width={450} height={350} alt="Falun town" />
                    <figcaption>
                      <h2>About the City of Falun</h2>
                      <p>
                        Falun is a city and the seat of Falun Municipality
                        in Dalarna County, Sweden, with 37,291 inhabitants
                        in 2010. It is also the capital of Dalarna County.
                        Falun forms, together with Borlänge, a metropolitan
                        area with close to 100,000 inhabitants.<br /> Falun
                              was originally famous for its copper mine, and is
                              today an important service and industrial city even
                              though the mine is closed (since 1992). The year
                              2001, the city, the copper mine and mining areas of
                              Falun were added to the list of world heritage sites
                              by the United Nations, which means that the city is
                              worth preserving, as it is considered to be of
                              interest for all of humanity.
                      </p>
                      <footer className="more">
                        <a href="https://en.wikipedia.org/wiki/Falun">
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
              <h2 className="pl-title">About Falun</h2>
              <nav>
                <ul className="place-ul">
                  <li>
                    <a href="/">Welcome to Falun</a>
                  </li>
                  <li>
                    <a href="/">More about Falun</a>
                  </li>
                  <li>
                    <a href="/">Offical website of Falun</a>
                  </li>
                  <li>
                    <a href="/">History of Falun</a>
                  </li>
                  <li>
                    <a href="/">Weather in Falun</a>
                  </li>
                  <li className="last">
                    <a href="/">Attractions</a>
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
                    <a href="/">Things to do in Falun</a>
                  </li>
                  <li>
                    <a href="/">Sightseeing</a>
                  </li>
                  <li>
                    <a href="/">Attractions in Falun</a>
                  </li>
                  <li>
                    <a href="/">Recommendations form tripadvisor</a>
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
                    <a href="/">Scandic Falun</a>
                  </li>
                  <li>
                    <a href="/">Hotel Falun</a>
                  </li>
                  <li>
                    <a href="/">Clarion Hotel</a>
                  </li>
                  <li>
                    <a href="/">First Hotel Grand falun</a>
                  </li>
                  <li className="last">
                    <a href="/">Hotel Falun</a>
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

export default Falun;
