import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import thummbnail from "../../components/assets/images/thumbnail_1.jpg";
import VideoPlayer from "../../components/videoplayer/index";
import * as actions from "../../redux/actions";

export class index extends Component {
  render() {
      return (
        <div className="rt-card">
            <a href="javascript: void(0);" className="rt-cardimage">
                <img
                  src={thummbnail}
                  alt="video image"/>
            </a>
            <a href="{{route('portfolio.detail')}}" class="rt-btnplay">
              <i class="fas fa-clock"></i>
            </a>
            <a href="{{route('portfolio.detail')}}"class="rt-btnplayvtwo">
              <i class="fas fa-check-circle"></i>
            </a>
          <div className="rt-cardcontentholder">
            <button type="button" className="rt-channellogo" data-toggle="tooltip" data-placement="right" title="sajid ali ">
              <img src={thummbnail} alt="channel logo" />
            </button>
            <div className="rt-cardcontent">
              <div className="rt-cardtitle">
                <h2>title</h2>
              </div>
              <div className="rt-carddetail">
                <span>6.9M views - </span>
                <span>2019-03-29 19:46:57</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

const mapStateToProps = state => ({
  // data: state.videoReducer.data
});

const mapDispatchToProps = {
  videoHtml: actions.updateHtml
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
