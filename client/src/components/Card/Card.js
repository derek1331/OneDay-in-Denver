import React from "react";
import "./Card.css";
import { Card, Col, CardPanel } from "react-materialize";

class Cardy extends React.Component {
  render() {
    return (
      <CardPanel style={this.props.style}>
        <div className="row">
          <div className="col s11">
            <span
              style={{
                fontWeight: "bold"
              }}
              className={this.props.namecolor}
            >
              {this.props.name}{" "}
            </span>
            <br />
            <span style={{ color: "black", fontWeight:"bold"}}>Time: </span>
            <span>{this.props.description}</span>

          </div>
          <div className="col s1">{this.props.children}</div>
        </div>
      </CardPanel>
    );
  }
}

class Cardy2 extends React.Component {
  render() {
    return (
      <CardPanel className={this.props.class} style={this.props.style}>
        <div className="row">
          <div className="col s11">
            <a
              style={{
                fontWeight: "bold"
              }}
              className={this.props.namecolor}
              href={this.props.href}
            >
              {this.props.name}
            </a>
            <br />
            <span style={{ color: "black", fontWeight: "bold" }}>Time: </span>
            <span>{this.props.time}</span>
            <br />
            <span style={{ color: "black", fontWeight: "bold" }}>
              Location:{" "}
            </span>
            <span>{this.props.location}</span>
          </div>
          <div className="col s1">{this.props.children}</div>
        </div>
      </CardPanel>
    );
  }
}

class Cardy4 extends React.Component {
  render() {
    return <CardPanel style={{backgroundColor: "#fafafa"}}>{this.props.children}</CardPanel>;
  }
}
export { Cardy, Cardy2, Cardy4 };
