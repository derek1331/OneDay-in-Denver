import React from "react";
import "./Home.css";
import { Parallax } from "react-materialize";
import TestModal from "../../components/Modal";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="home-header">
          <div className="section">
            <br />
            <br />
            <h1 className="header center white-text text-lighten-2">
              Plan Your Day
            </h1>
            <div className="row center">
              <TestModal />
            </div>
            <div className="row center" />
            <br />
            <br />
          </div>
        </div>
        <Parallax imageSrc="images\skylinenight.jpg" />

        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12 m4 center">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    Adventure

                  </h2>
                  <p>
                    Fly fishing, exploring, skydiving, mountain climbing,
                    kayaking, mountain biking, skiing, snowboarding, hiking,
                    river rafting or participating in extreme sports.
                  </p>
                </div>
              </div>
              <div className="col s12 m4 center">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    Dining
                  </h2>
                  <p>
                    In Denver, one can eat incredibly well across many cuisines,
                    enjoy beer from a not-so-secret beer scene to fantastic
                    craft spirits and a booming roster of restaurants that take
                    influences from the far reaches of the globe, there's a
                    little bit of everything in the Mile High City.
                  </p>
                </div>
              </div>
              <div className="col s12 m4 center">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    Entertainment
                  </h2>
                  <p>
                    Top-rated events from beer tours, concerts, museums, parks,
                    canibus tours, outdoor concerts, sporting events, opera,
                    casinos, symphony, theatre, and jazz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Parallax imageSrc="images\maroonbells.jpg" />
      </div>
    );
  }
}
export default Home;
