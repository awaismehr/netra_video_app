import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./dropdown.css";
import * as actions from "../../redux/actions";
export class dropdown extends Component {
  handleClick = time => {
    this.props.timeSearch(time);
    this.props.history.push("/");
  };
  render() {
    return (
      <Fragment>
        {/* <div className="dropdown rt-dropdown">
          <a
            className="btn btn-secondary dropdown-toggle pos"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="far fa-calendar-alt"></i>
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a
              className="dropdown-item"
              href="#"
              onClick={() => this.handleClick("1day")}
            >
              last day
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => this.handleClick("1week")}
            >
              last week
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => this.handleClick("1month")}
            >
              last month
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => this.handleClick("1year")}
            >
              last year
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => this.handleClick("all")}
            >
              All
            </a>
          </div>
        </div> */}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  timeSearch: actions.timeSearch
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(dropdown)
);
