import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./login.css";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { responseFb } from "../../redux/actions";
import * as actions from "../../redux/actions";

export class login extends Component {
  responseFacebook = response => {
    console.log(response);
    this.props.responseGoogle({
      isFbLoggedIn: true,
      FbUserInfo: {
        email: response.email,
        name: response.name,
        picture: response.picture.data.url
      }
    });
  };
  responseGoogle = response => {
    console.log(this.props.isGoogleLoggedIn);
    this.props.responseGoogle({
      isGoogleLoggedIn: true,
      gUserInfo: {
        email: response.profileObj.email,
        name: response.profileObj.name,
        picture: response.profileObj.imageUrl
      }
    });
  };

  render() {
    let googleContent = null;
    let fbContent = null;

    if (!this.props.isGoogleLoggedIn) {
      fbContent = this.props.isFbLoggedIn ? (
        <Fragment>
          <img className="rt-userimage" src={this.props.FbUserInfo.picture} />
          <p className="rt-name">{this.props.FbUserInfo.name}</p>
          <p className="rt-name rt-useremail">{this.props.FbUserInfo.email}</p>
          <a
            className="dropdown-item rt-logoutitem"
            onClick={this.props.logout}
          >
            Logout
          </a>
        </Fragment>
      ) : (
        <FacebookLogin
          appId="2780641218881532"
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    if (!this.props.isFbLoggedIn) {
      googleContent =
        this.props.isGoogleLoggedIn && !this.props.isFbLoggedIn ? (
          <Fragment>
            <img className="rt-userimage" src={this.props.gUserInfo.picture} />
            <p className="rt-name">{this.props.gUserInfo.name}</p>
            <p className="rt-name rt-useremail">{this.props.gUserInfo.email}</p>
            <a
              className="dropdown-item rt-logoutitem"
              onClick={this.props.logout}
            >
              Logout
            </a>
          </Fragment>
        ) : (
          <GoogleLogin
            clientId="69214637056-9n862hc5j81h0f87uccvmld7feajvmok.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        );
    }

    return (
      <Fragment>
        <div className="dropdown rt-dropdown">
          <a
            className="btn btn-secondary rt-btnlogin dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Login
            {/* <i className="fab fa-google"></i> */}
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
           <a className="dropdown-item">{googleContent}</a>
            <a className="dropdown-item">{fbContent}</a>
            {/*
        <a
          className="dropdown-item"
          href="#"
          onClick={this.props.logout}
        >
          Logout
        </a> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isGoogleLoggedIn: state.videoReducer.isGoogleLoggedIn,
  isFbLoggedIn: state.videoReducer.isFbLoggedIn,
  gUserInfo: state.videoReducer.gUserInfo,
  FbUserInfo: state.videoReducer.FbUserInfo
});

const mapDispatchToProps = {
  responseGoogle: actions.responseGoogle,
  responseFb: actions.responseFb,
  logout: actions.logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(login);
