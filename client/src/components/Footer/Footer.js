import React from "react";
import "./Footer.css";
import { Footer } from "react-materialize";

class Foot extends React.Component {
  render() {
    return (
      <Footer
        copyrights="2018 Copyright ONEDAYINDENVER"

        links={
          <ul>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
                Local Favorites
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
                Meetups
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
              Itinerary
              </a>
            </li>
          </ul>
        }
        className="teal"
      >
        <p className=" live "> LIVE LOVE WANDER</p>
        {/* <p className = " love "> LOVE</p>
     <p className = " Wander "> WANDER</p> */}
        <div />

        <div className="picture">
          ReactDOM.render(Parser('
          <div>
            <img src="https://image.ibb.co/cZsma0/logo.png" alt=" Mountains" />
          </div>
          '), document.getElementById('root'));
        </div>
      </Footer>
    );
  }
}
export default Foot;
