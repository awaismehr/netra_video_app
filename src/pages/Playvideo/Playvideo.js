import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Videoplayer from "../../components/videoplayer";
import Sidevideolist from "../../components/sidevideolist";
import Nav from "../../components/Nav";
import Sidebar from "../../subComponents/Sidenav/sidebar";
import Videolist from "../../components/videolist";
import Loader from "react-loader-spinner";
import * as actions from '../../redux/actions'
// import { Modal } from "bootstrap";
// import Modal from '../../subComponents/Modal/modal'
import './playvideo.css'

export class Playvideo extends Component {
  constructor(props){
    super(props)
    props.showRecommendations(false)
  }
  static propTypes = {
    prop: PropTypes
  };
  // handleClick = () => {
  //   this.props.show ? 
  //  this.props.showRecommendations(false)
  //  :
  //  this.props.showRecommendations(true)
  // };
  render() {
    let cname = this.props.toggle ? "rt-wrapper rt-hideshow" : "rt-wrapper";
    let list = this.props.isLoading ? (
      <Loader
        className="loader"
        type="ThreeDots"
        color="#00BFFF"
        height={80}
        width={80}
      />
    ) : (
      <Videolist slider />
    );
    return (
      <Fragment>
        <div className={`${cname}`}>
          <Nav />
          <Sidebar />
          {/* <Modal/> */}
          <Videoplayer />
          {/* <Sidevideolist /> */}
            {list}
          {/* {this.props.show ? (
            list
          ) : (
            <button
              type="button"
              class="btn btn-secondary btn-lg text-center-1"
              onClick={this.handleClick}
            >
              Related videos
            </button>
          )}
          {this.props.show && (
            <button
              type="button"
              class="btn btn-secondary btn-lg text-center-1 "
              onClick={this.handleClick}
            >
              Hide Related videos
            </button>
          )} */}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  toggle: state.toggleReducer.toggle,
  isLoading: state.videoReducer.isLoading,
  show: state.videoReducer.showRecommended
});

const mapDispatchToProps = {
  showRecommendations : actions.showRecommendations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playvideo);
