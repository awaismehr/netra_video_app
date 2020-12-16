import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./toggle.css";
import * as actions from "../../redux/actions";

export class toggle extends Component {
  clickHandler = () => {
    this.props.toggle();
  };

  render() {
    return (
      <Fragment >
        <div className="rt-toggle">
        <a
          href="javascript: void(0);"
          className="rt-btnmenu"
          onClick={this.clickHandler}
        >
          <i className="fas fa-bars"></i>
        </a>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  toggle: actions.toggle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toggle);
