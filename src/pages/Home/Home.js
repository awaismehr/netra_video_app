import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroller";
import Nav from "../../components/Nav";
import SideBar from "../../subComponents/Sidenav/sidebar";
import Videolist from "../../components/videolist";
import "../../components/Nav/index.css";
import LazyLoad from "react-lazy-load";
import * as actions from "../../redux/actions/index";
// import Modal from "../../subComponents/Modal/modal";
import "../../redux/selectors/index";
import { selectIsLoadingFromtState } from "../../redux/selectors/index";
export class Home extends Component {
  render() {
    let cname = this.props.toggle ? "rt-wrapper rt-hideshow" : "rt-wrapper";
    return (
      <Fragment>
        <div className={`${cname}`}>
          <Nav />
          <SideBar />
          {/* <Modal/> */}
          {this.props.isError ? (
            <span>No search Results!</span>
          ) : this.props.isLoading ? (
            <Loader
              className="loader"
              type="ThreeDots"
              color="#00BFFF"
              height={80}
              width={80}
            />
          ) : (
            <InfiniteScroll
              pageStart={-1}
              loadMore={() =>
                this.props.loadmore(this.props.query, this.props.from + 30)
              }
              hasMore={true || false}
              loader={
                <Loader
                  className="loader"
                  type="ThreeDots"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              }
            >
              <LazyLoad height={200} offsetBottom={200}>
                <Videolist />
              </LazyLoad>
            </InfiniteScroll>
          )}

          {/* {!this.props.isLoading && (
            <button
              type="button"
              class="btn btn-secondary btn-lg text-center-1 "
              onClick={() => this.props.loadmore(false, this.props.from + 30)}
            >
              load more videos
            </button>
          )} */}
          {/* <InfiniteScroll
            pageStart={-1}
            loadMore={() => this.props.loadmore(false, this.props.from + 30)}
            hasMore={true || false}
            loader={
              <Loader
                className="loader"
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
              />
            }
          >
            <Videolist />
          </InfiniteScroll> */}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  toggle: state.toggleReducer.toggle,
  isLoading: selectIsLoadingFromtState(state),
  // isLoading: state.videoReducer.isLoading,
  from: state.videoReducer.from,
  query: state.videoReducer.query,
  isError: state.videoReducer.isError,
});

const mapDispatchToProps = {
  loadmore: actions.loadMore,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
