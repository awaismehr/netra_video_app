import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Toggle from "../../subComponents/Nav/toggle";
import Dropdown from "../../subComponents/Nav/dropdown";
// import User from "../../subComponents/Nav/user";
import Search from "../../subComponents/Nav/search";
import Login from "../../subComponents/Nav/login";
import "./index.css";
import logo from "../../components/assets/images/logo.png";
import Sidebar from "../../subComponents/Sidenav/sidebar";
import VideoList from "../videolist/index";
import Videoplayer from "../videoplayer";
import * as actions from "../../redux/actions";
import User from "../../subComponents/Nav/User";

export class Nav extends Component {
  handleLogoClick = () => {
    this.props.logoClick();
    this.props.history.push("/");
  };
  render() {
    let cname = this.props.toggle ? "rt-wrapper rt-hideshow" : "rt-wrapper";
    return (
      <Fragment>
        {/* <div className={`${cname}`}> */}
        <header className="rt-header">
          <Toggle />
          {/* <Link to="/"> */}
          <strong className="rt-logo" onClick={this.handleLogoClick}>
            <a href="javascript: void(0);">
              <img src={logo} height="100%" width="100%" alt="logo image" />{" "}
            </a>
          </strong>
          {/* </Link> */}
          {/* <b className="rt-discover">Discover videos</b> */}
          {/* <Login /> */}
        
          <User/>
         
          {/* <User /> */}
          {/* <Dropdown /> */}
          <Search />
        </header>
        {/* <Sidebar /> */}
        {/* <Videoplayer  /> */}
        {/* <VideoList /> */}
        {/* </div> */}
      
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
  )(Nav)
);
