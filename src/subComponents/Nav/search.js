import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./search.css";
import * as actions from "../../redux/actions";
export class search extends Component {
  handleClick = time => {
    this.props.timeSearch(time);
    this.props.history.push("/");
  };
  state = {
    value: ""
  };
  handleClear = () => {
    this.props.clearChecks();
  };
  handleChange = e => {
    this.props.updateSearch(e.target.value);
    this.setState({
      value: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (!this.props.list_query.length) {
      this.props.fetchVideos(this.state.value);
    } else {
      this.props.multiSearchVideos(this.props.list_query);
    }
    this.props.history.push("/search");
  };
  render() {
    return (
      <Fragment>
        <div className="rt-searcharea">
          <form className="rt-formtheme" onSubmit={this.handleSubmit}>
            <fieldset>
              <div className="form-group">
                <input
                  type="text"
                  name="search"
                  placeholder="search"
                  value={this.props.value}
                  onChange={this.handleChange}
                />
                {this.props.count ? (
                  <a
                    className="rt-clearedallinput"
                    onClick={this.handleClear}
                    href="javacsript: void(0);"
                  >
                    X
                  </a>
                ) : null}

                <button className="rt-btnsearch">
                  <i class="fas fa-search"></i>
                  {this.props.count ? (
                    <span className="clearsearch">{this.props.count}</span>
                  ) : null}
                </button>
              </div>
            </fieldset>
          </form>
          <div className="dropdown rt-dropdown">
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
        </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  value: state.videoReducer.value,
  list_query: state.videoReducer.list_query,
  count: state.videoReducer.count
});

const mapDispatchToProps = {
  fetchVideos: actions.fetchvideoFromElastic,
  updateSearch: actions.updateSearch,
  multiSearchVideos: actions.multiSearchVideos,
  clearChecks: actions.clearChecks,
  timeSearch: actions.timeSearch
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(search)
);
