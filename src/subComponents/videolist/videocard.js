import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link, NavLink,withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import logo from "../../components/assets/images/logo.png";
import thummbnail from "../../components/assets/images/thumbnail_1.jpg";
import VideoPlayer from "../../components/videoplayer/index";
import * as actions from "../../redux/actions";
import "./videocard.css";
import LazyLoad from 'react-lazy-load';
export class videocard extends Component {
  state = {
    data: [],
    query: "is",
    show: false,
    html: "",
    loading: true,
    ENDPOINT: "recommend_search",
    change: true,
    value: "",
    customValue: "",
    list_query: [],
    bshow: false,
    check: false,
    count: 0,
    checked: [],
    vidsrc: "",
    imageError: true,
    favorite: [],
    isChecked: false,
  };
  handleClick = () => {};


  recentHandler = (video) => {
    // this.props.notRecent(video._id);
    // this.props.recent(video);
    let unchecked = this.props.recentArray.filter((v) => {
      return v._id === video._id;
    });

    let checked = this.props.favArray.filter((v, i) => {
      return v._id !== video._id;
    });
    let data = unchecked.length ? checked : [...this.props.recentArray, video];
    this.props.recent(data);
  };

  favHandler = (video, e) => {
    let unchecked = this.props.favArray.filter((v, i) => {
      return v._id === video._id;
    });
    //filter the already placed array
    let checked = this.props.favArray.filter((v, i) => {
      return v._id !== video._id;
    });
    let data = unchecked.length ? checked : [...this.props.favArray, video];
    this.props.addFav(data);

    // do this methord if we want to as checkbox
    // //check whether obj is already in favArray if then remove it.
    // this.props.notFav(video._id);
    // //   // if e.target.checked===true then execute the following code
    // e.target.checked ? this.props.fav(video) : this.props.notFav(video._id);
  };
  handleRadio = (e) => {
    this.props.isClear(false);
    // console.log(e.target, "########################");
    let checkedarr = this.props.checked.filter((i) => {
      return i == e.target.name;
    });
    console.log(checkedarr, "CHECKED");

    let checkedarr2 = this.props.checked.filter((i) => {
      return i != e.target.name;
    });

    console.log(checkedarr2, "CHECKED");

    let newEcount = checkedarr.length
      ? this.props.count - 1
      : this.props.count + 1;
    this.props.updateSearch({
      checked: checkedarr.length
        ? checkedarr2
        : [...this.props.checked, e.target.name],
      list_query: [...this.props.list_query, e.target.value],
      value: newEcount ? `find more like ${newEcount} selected...` : "",
      count: newEcount,
    });
    let check = !this.state.check;
    this.setState({
      check: check,
    });
    // this.props.updateSearch(newEcount ? `more like ${newEcount} title...` : "");
  };
  render() {
    // console.log("props+++++++++", this.state);
    const { video, index } = this.props;
const category=video._source.netra_category.split(' ');
const firstWord=category[0];
let subCategory=video._source.netra_subcategory;
if(subCategory===""){
  subCategory='undefined'
}

    let input = (
      <input
        type="checkbox"
        name={index}
        id={index}
        value={video._id}
        onChange={this.handleRadio}
      />
    );

    if (this.props.clear) {
      if (this.state.check) {
        this.setState({
          check: false,
        });
      }
      input = (
        <input
          type="checkbox"
          name={index}
          id={index}
          value={video._source.title}
          onChange={this.handleRadio}
          checked={false}
        />
      );
      if (index >= this.props.c - 1) {
        this.props.isClear(false);
      }
    }
    if (!video._source.thumbnail || video._source.media.oembed) {
      let html = null;
      if (video._source.media.oembed.html[0] != "<") {
        html = ReactHtmlParser(video._source.media.oembed.html);
        html = html[0];
      } else {
        html = video._source.media.oembed.html;
      }

      let time = moment(moment.unix(video._source.created_utc)).fromNow();
      if (time.includes("years")) time = time.replace(" years", "y");
      if (time.includes("months")) time = time.replace(" months", "m");
      if (time.includes("days")) time = time.replace(" days", "d");
      let description = video._source.media.oembed.description
        ? video._source.media.oembed.description
        : "";
      let full_title = description + video._source.media.oembed.title;

      // let classes = this.state.check ? ["rt-card"] : ["rt-card"];
      let classes = this.state.check ? ["rt-card", "backdrop"] : ["rt-card"];
      let display = this.state.check ? ["display"] : ["none"];

      let descEnd = full_title.indexOf(" ", 22);

      return (
        <div className={classes.join(" ")}>
          <div className="rt-checkboxstar">
            {input}
            <label htmlFor={index}>
              <i class="fas fa-star"></i>
            </label>
          </div>
          {this.props.delete && (
            <a
              className="rt-clearallinput"
              onClick={() => {
                this.props.deleteRecentVideo(this.props.index);
              }}
              href="javacsript: void(0);"
            >
              X
            </a>
          )}
          <div className={display}>
            <div className="rt-checkboxstar rt-checkboxheart">
              <input
                type="checkbox"
                name={index}
                id={video._id}
                value={video._source.title}
                onChange={(e) => {
                  this.favHandler(video, e);
                }}
              />
              <label htmlFor={video._id}>
                <i class="fas fa-heart"></i>
              </label>
            </div>
            {!video._source.media ? (
              <a href="javascript: void(0);" className="rt-cardimage">
                <Link to="/video">
                  <img
                    
                    src={`${video._source.thumbnail}`}
                    alt="thumbnail expired"
                    onError={() => this.props.handleImageError(index)}
                    // onClick={() => {
                    //   this.handleClick(html, video._source.title);
                    //   this.props.updated_history(this.props.video);
                    // }}
                  />
                </Link>
              </a>
            ) : (
              <a href="javascript: void(0);" className="rt-cardimage">
                <Link to="/video">
                  
                  <img
            
                    src={`${video._source.media.oembed.thumbnail_url}`}
                    alt="thumbnail expired"
                    onError={() => this.props.handleImageError(index)}
                    onClick={() => {
                      this.props.videoHtml(
                        html,
                        ` ${video._source.title}`,
                        time,
                        description,
                        `${video._source.media.oembed.title}.`,
                        `${video._source.subreddit}`
                      );
                      // this.props.recentHistory(this.props.video);
                       this.recentHandler(video)
                    }}
                  />
                </Link>
              </a>
              // <img
              //   class="card-img-top"

              //   alt="thumbnail expired"
              //   width="200"
              //   height="170"
              //   onError={() => this.handleImageError(i)}
              //   // onLoad={this.handleImageLoad}
              //   onClick={() => this.handleClick(html, video._source.title)}
              // />
            )}
            <div className="rt-cardcontentholder">
              {/* <button
              type="button"
              className="rt-channellogo"
              data-toggle="tooltip"
              data-placement="right"
              title="sajid ali "
            >
              <img src={thummbnail} alt="channel logo" />
            </button> */}
              <div className="rt-cardcontent">
                <div className="rt-cardtitle">
                  <Link
                    to="/video"
                    onClick={() => {
                      this.props.videoHtml(
                        html,
                        ` ${video._source.title}`,
                        time,
                        description,
                        `${video._source.media.oembed.title}.`
                      );
                      this.props.recentHistory(this.props.video);
                    }}
                  >
                    {video._source.title.length <= 30 ? (
                      <h2 className="fontsize">
                        {`${video._source.title.substring(
                          0,
                          video._source.title.length
                        )}`}
                      </h2>
                    ) : (
                      <h2 className="fontsize">
                        {`${video._source.title.substring(0, 29)}...`}
                      </h2>
                    )}

                    {/* <h2 className="fontsize">{`${video._source.media.oembed.title.substring(
                    0,
                    26
                  )}...`}</h2> */}
                  </Link>
                </div>
                <div className="rt-carddetail">
                  {/* <span>Date: </span> */}

                  <p className="rt-description">
                    {`${full_title.substring(0, descEnd)}`}
                    {`${full_title.substring(descEnd, 55)}`}...
                  </p>
                  <div className="rt-timecategoryholder">
                    <Link>
                      {/* {moment(moment.unix(video._source.created_utc)).fromNow()} */}
                      {time}
                      {/* <span>
                        
                      {this.props.showFavBtn && (
                          <>
                            
                            <button
                              className="btn-danger"
                              onClick={this.props.delFav}
                            >
                              DELETE
                            </button>
                          </>
                        )}


                        {this.props.show && (
                          <>
                            <br />
                            <button
                              className="btn-danger"
                              onClick={this.props.del}
                            >
                              DELETE
                            </button>
                          </>
                        )}
                      </span> */}
                      {/* {new Date(video._source.created_utc * 1000).toISOString()
                    .slice(0, 19)
                    .replace("T", " ")
                    } */}
                    </Link>
                    <div className="at-bynholders">
                      <span className="at-btndelete">
                          
                      {this.props.showFavBtn && (
                          <>
                            
                            <button
                              className="btn-danger"
                              onClick={this.props.delFav}
                            >
                              DELETE
                            </button>
                          </>
                        )}


                        {this.props.show && (
                          <>
                            
                            <button
                              className="btn-danger"
                              onClick={this.props.del}
                            >
                              DELETE
                            </button>
                          </>
                        )}
                      </span>
                      <span className="rt-categorybtn">{firstWord}</span>
                      <span className="rt-categorybtn mr-1">{subCategory}</span>
                    </div>
                  </div>
                  <span>
                    {
                      //  <button
                      //   className="btn btn-secondary rt-btnremove "
                      //   onClick={() => {
                      //     this.props.deleteRecentVideo(this.props.index);
                      //   }}
                      // >
                      //   Delete
                      // </button>
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  value: state.videoReducer.value,
  checked: state.videoReducer.checked,
  list_query: state.videoReducer.list_query,
  count: state.videoReducer.count,
  favorite: state.videoReducer.favorite,
  recent: state.videoReducer.history,
  clear: state.videoReducer.clear,
  data: state.videoReducer.data,
  favArray: state.videoReducer.favArray,
  recentArray: state.videoReducer.recentArray,
  isFav: state.videoReducer.isFav,
  showFav: state.videoReducer.showFav,
  showDelBtn: state.videoReducer.showDelBtn,
});

const mapDispatchToProps = {
  videoHtml: actions.updateHtml,
  updateSearch: actions.mutltiSearch,
  updateFav: actions.updateFav,
  handleImageError: actions.handleImageError,
  recentHistory: actions.updateHistory,
  deleteRecentVideo: actions.deleteRecentVideo,
  isClear: actions.isClear,
  recent: (data) => actions.recent(data),
  addFav: (data) => actions.addFav(data),
  showDelBtn: actions.showDelBtn,
};

// const mapDispatchToProps = (dispatch) => ({
//   addFav: (data) => actions.addFav(data),
//   videoHtml: actions.updateHtml,
//   updateSearch: actions.mutltiSearch,
//   handleImageError: actions.handleImageError,
//   // notFav: (video) => dispatch(actions.notFav(video)),
//   // fav: (video) => {
//   //   dispatch(actions.fav(video));
//   // },
//   // checkIsFav: (checked) => {
//   //   dispatch(actions.checkIsFav(checked));
//   // },
//   recent:(data)=>actions.recent(data),
//   //  notRecent: (id) => dispatch(actions.notRecent(id)),
//   //  recent: (video) => dispatch(actions.recent(video)),
//   //  showDelBtn: () => dispatch(actions.showDelBtn()),
// });
export default connect(mapStateToProps, mapDispatchToProps)(videocard);
