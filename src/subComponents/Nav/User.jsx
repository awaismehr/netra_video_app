import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./login.css";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { responseFb } from "../../redux/actions";
import * as actions from "../../redux/actions";
import "./User.css";
import Modal from "react-modal";
Modal.setAppElement("#root");
export class User extends Component {
  state = {
    openContactModal: false,
    openFormModal: false,
  };
  reportHandler = () => {};

  render() {
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };

    let modalData = (
      <div className="text-center ">
        <h4 className="text-primary">Beta Access</h4>

        <p>login and favourites are in limited beta</p>

        <p>Enter your email to request beta access</p>

        <input type="text" placeholder="email" />
        <br />
        <small> We'll never share your email with anyone else.</small>
        <br />
        <div className="text-center">
          <button className="btn btn-outline-success">submit</button>
          <button
            className="btn btn-outline-warning ml-3"
            onClick={() => this.props.modal(false, false)}
            // onClick={() => this.setState({ openContactModal: false })}
          >
            close
          </button>
        </div>
      </div>
    );
    if (this.props.openFormModal) {
      modalData = (
        <>
          <div className="at-formholder">
            <form className="at-formtheme">
              <fieldset>
                <legend className="text-center text-success">contact us</legend>
                <div class="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">Message</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </fieldset>
            </form>
          </div>
        </>
      );
    }

    return (
      <Fragment>
        <Modal
          isOpen={this.props.openContactModal}
          style={customStyles}
          onRequestClose={() => this.props.modal(false, false)}
          // onRequestClose={() => this.setState({ openContactModal: false,openFormModal:false })}
        >
          {modalData}
        </Modal>

        <Modal
          style={customStyles}
          isOpen={this.props.openFormModal}
          onRequestClose={() => this.props.modal(false, false)}

          // onRequestClose={() => this.setState({ openFormModal: false ,openContactModal:false})}
        >
          {modalData}
        </Modal>
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
            {/* Login */}
            <i className="fab fa-google"></i>
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <p
              className="dropdown-item"
              onClick={() => this.props.modal(false, true)}
              // onClick={() => this.setState({ openContactModal: true,openFormModal:false })}
            >
              Beta Access
            </p>
            <p
              className="dropdown-item"
              onClick={() => {
                this.props.modal(true, false);
                // this.setState({ openFormModal: true,openContactModal:false });
              }}
            >
              Contact Us
            </p>
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

const mapStateToProps = (state) => ({
  isGoogleLoggedIn: state.videoReducer.isGoogleLoggedIn,
  isFbLoggedIn: state.videoReducer.isFbLoggedIn,
  gUserInfo: state.videoReducer.gUserInfo,
  FbUserInfo: state.videoReducer.FbUserInfo,
  openFormModal: state.videoReducer.openFormModal,
  openContactModal: state.videoReducer.openContactModal,
});

const mapDispatchToProps = {
  responseGoogle: actions.responseGoogle,
  responseFb: actions.responseFb,
  logout: actions.logout,
  modal: actions.modal,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
