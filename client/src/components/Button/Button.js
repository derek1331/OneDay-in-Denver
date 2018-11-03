import React from "react";
import { Icon, Button, Row, Input } from "react-materialize";

class LikeButton extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      liked: !this.state.liked
    });
  }

  render() {
    const icon = this.state.liked ? (
      <Icon small>star</Icon>
    ) : (
      <Icon small>star_border</Icon>
    );
    return (
      <a className="right" onClick={this.handleClick}>
        {icon}
      </a>
    );
  }
}

class SearchButton extends React.Component {
  render() {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Placeholder"
                id={this.props.id}
                type="text"
                className="validate"
              />
              <label htmlFor="Search">Search</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export { LikeButton, SearchButton };
