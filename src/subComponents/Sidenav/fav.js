
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Nav from "../../components/Nav";
import SideBar from "../../subComponents/Sidenav/sidebar";
import Videolist from "../../components/videolist";
import "../../components/Nav/index.css";
import * as actions from "../../redux/actions";
import Card from '../videolist/videocard'

export class favorite extends Component {
  render() {
    let resp = this.props.data.map((video, i) => {
      if (video._source.media == null || video._source.over_18) {
        return;
      }
      if (video._source.media.reddit_video) {
        return;
      }
      return <Card key= {video._id} video={video} index={i} showFavBtn={true}  delFav={() => this.props.delFav(video._id)} />;
    });
    let cname = this.props.toggle ? "rt-wrapper rt-hideshow" : "rt-wrapper";

    return (
      <Fragment>
        <div className={`${cname}`}>
          <Nav />
          <SideBar /> {resp.length === 0 ? (
            <p>no fav video</p>
          ) : (
            <>
              <div className="text-right">
                <button className="btn btn-danger mb-3" onClick={this.props.resetFav}>
                  Remove all
                </button>
              </div>
              <main className="rt-main">
                <div className="rt-cardholder">{resp}</div>
              </main>
            </>
          )}
          {/* {this.props.data.length === 0 && <div><span>No Favourite Videos!</span></div>}
          {this.props.isLoading && this.props.data.length !== 0 ? (
            <Loader
              className="loader"
              type="ThreeDots"
              color="#00BFFF"
              height={80}
              width={80}
            />
          ) : (
            <div className="rt-cardholder">{resp}</div>
          )} */}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  toggle: state.toggleReducer.toggle,
  isLoading : state.videoReducer.isLoading,
  data : state.videoReducer.favArray
});

const mapDispatchToProps={
  resetFav:actions.resetFav,
  delFav:actions.delFav,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(favorite);



