import React from "react";
import "./Home.css";
import { Parallax } from "react-materialize";


class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="home-header">
          <div className="section">
            <br />
            <br />
            <h1 className="header center teal-text text-lighten-2">
              A Day In Denver
            </h1>
            <div className="row center">
              <h5 className="header col s12 light white-text">
                One Day In Denver is the one stop app for exploring Denver!
              </h5>
            </div>
            <div className="row center">
              <a
                href="http://materializecss.com/getting-started.html"
                id="download-button"
                className="btn-large waves-effect waves-light teal lighten-1"
              >
                Sign up | Login
              </a>
            </div>
            <br />
            <br />
          </div>
        </div>
        <Parallax imageSrc="http://www.cpr.org/sites/default/files/styles/full-width/public/images/stockshowparade3.jpg?itok=D1cuHJeg" />

        <div className="container">
          <div className="section">
            {/*   Icon Section   */}
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons">Adventure</i>
                  </h2>
                  <h5 className="center">Speeds up development</h5>
                  <p className="light">
                    We did most of the heavy lifting for you to provide a
                    default stylings that incorporate our custom components.
                    Additionally, we refined animations and transitions to
                    provide a smoother experience for developers.
                  </p>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons">Dining</i>
                  </h2>
                  <h5 className="center">User Experience Focused</h5>
                  <p className="light">
                    By utilizing elements and principles of Material Design, we
                    were able to create a framework that incorporates components
                    and animations that provide more feedback to users.
                    Additionally, a single underlying responsive system across
                    all platforms allow for a more unified user experience.
                  </p>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text">
                    <i className="material-icons">Experiences</i>
                  </h2>
                  <h5 className="center">Easy to work with</h5>
                  <p className="light">
                    We have provided detailed documentation as well as specific
                    code examples to help new users get started. We are also
                    always open to feedback and can answer any questions a user
                    may have about Materialize.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Parallax imageSrc="images\maroonbells.jpg"/>

        {/* <div className="container">
          <div className="row center">
            <h5 className="header col s12 light">
              A modern responsive front-end framework based on Material Design
            </h5>
          </div>
        </div> */}
        <div className="container">
          <div className="section">
            {/* <img src="http://www.cpr.org/sites/default/files/styles/full-width/public/images/stockshowparade3.jpg?itok=D1cuHJeg"> */}
            <div className="row">
              <div className="col s12 center">
                <h3>
                  <i className="mdi-content-send brown-text" />
                </h3>
                <h4>Contact Us</h4>
                <p className="left-align light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam scelerisque id nunc nec volutpat. Etiam pellentesque
                  tristique arcu, non consequat magna fermentum ac. Cras ut
                  ultricies eros. Maecenas eros justo, ullamcorper a sapien id,
                  viverra ultrices eros. Morbi sem neque, posuere et pretium
                  eget, bibendum sollicitudin lacus. Aliquam eleifend
                  sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet
                  semper molestie. Morbi massa odio, condimentum sed ipsum ac,
                  gravida ultrices erat. Nullam eget dignissim mauris, non
                  tristique erat. Vestibulum ante ipsum primis in faucibus orci
                  luctus et ultrices posuere cubilia Curae;
                </p>
              </div>
            </div>
          </div>
        </div>
        <Parallax imageSrc="images\skylinenight.jpg"/>
        {/* <div className="container">
          <div className="row center">
            <h5 className="header col s12 light">
              A modern responsive front-end framework based on Material Design
            </h5>
          </div>
        </div> */}
      </div>
    );
  }
}
export default Home;
