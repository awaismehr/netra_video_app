import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./sidebar.css";
import * as actions from "../../redux/actions";
import { Link, withRouter } from "react-router-dom";

export class sidebar extends Component {
  // case 1 = 'rt-sidebarwrapper'
  // case 1 = 'rt-sidebarwrapper rt-hideshow'
  handleLogoClick = () => {
    this.props.logoClick();
    this.props.history.push("/");
  };
  render() {
    let cname = this.props.toggle
      ? "rt-sidebarwrapper rt-hideshow"
      : "rt-sidebarwrapper";
    return (
      <Fragment>
        <div className="rt-sidebarwrapper">
          <div className="rt-sidebar">
            <nav className="rt-sidebarnav">
              <ul>
                <li onClick={this.handleLogoClick}>
                  <a href="javascript: void(0);">
                    <i class="fas fa-home"></i>
                    <span>home</span>
                  </a>
                </li>
                <Link to="/recent">
                  <li>
                    <a href="javascript: void(0);">
                      <i class="fas fa-clock"></i>
                      <span>recent</span>
                    </a>
                  </li>
                </Link>
                <Link to="/favourite">
                  <li>
                    <a href="javascript: void(0);">
                      <i class="fas fa-heart"></i>
                      <span>favourite</span>
                    </a>
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  toggle: state.toggleReducer.toggle
});

const mapDispatchToProps = {
  logoClick: actions.logoClick
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(sidebar)
);
