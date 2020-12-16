
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Nav from "../../components/Nav";
import SideBar from "../../subComponents/Sidenav/sidebar";
import Videolist from "../../components/videolist";
import "../../components/Nav/index.css";
import "./sidebar.css";
import Card from "../../subComponents/videolist/videocard";
import * as actions from "../../redux/actions";
export class recent extends Component {
  render() {
    let resp = this.props.data.map((video, i) => {
      if (video._source.media == null || video._source.over_18) {
        return;
      }
      if (video._source.media.reddit_video) {
        return;
      }
      return (
        <Card
          key={video._id}
          video={video}
          index={i}
          del={() => this.props.del(video._id)}
          show={true}
        />
      );
    });

    let cname = this.props.toggle ? "rt-wrapper rt-hideshow" : "rt-wrapper";
    return (
      <Fragment>
        <div className={`${cname}`}>
          <Nav />
          <SideBar />
          {resp.length === 0 ? (
            <p>no recent video</p>
          ) : (
            <>
              <div className="text-right">
                <button className="btn btn-danger mb-3" onClick={this.props.reset}>
                  RESET ALL
                </button>
              </div>
              <main className="rt-main">
                <div className="rt-cardholder">{resp}</div>
              </main>
            </>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.videoReducer.recentArray,
  toggle: state.toggleReducer.toggle,
  showFav: state.videoReducer.showFav,
});

const mapDispatchToProps = {
  reset: () => actions.reset(),
  del:  actions.delRecent,
};

export default connect(mapStateToProps, mapDispatchToProps)(recent);
