import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Card from "../../subComponents/videolist/videocard";
import "./index.css";
// import Modal from "../../subComponents/Modal/modal";
import Carousel from "react-elastic-carousel";
import Item from "./item";
import LazyLoad from 'react-lazyload';

export class index extends Component {
  state = {
    items: 4
  };
  componentDidMount() {
    let w = window.innerWidth;
    console.log("________________________++++++++", w);
    if (w < 500) {
      this.setState({
        items: 1
      });
    } else {
      this.setState({
        items: 4
      });
    }
  }
  
  

  render() {
    let resp = null;
    if (this.props.slider) {
      resp = this.props.data.map((video, i) => {
        if (video._source.media == null || video._source.over_18) {
          return;
        }
        if (video._source.media.reddit_video) {
          return;
        }
        return (
          <Item key={video._id}>
            <Card
              key={video._id}
              video={video}
              index={i}
              c={this.props.data.length}
            />
          </Item>
        );
      });
    } else {
      resp = this.props.data.map((video, i) => {
        if (video._source.media == null || video._source.over_18) {
          return;
        }
        if (video._source.media.reddit_video) {
          return;
        }
        return (
          <LazyLoad height = {300} offset = {-100}>
          <Card
            key={video._id}
            video={video}
            index={i}
            c={this.props.data.length}
          />
          </LazyLoad>
        );
      });
    }
    let breakPoints = [
      { width: 1, itemsToShow: 1 },
      { width: 550, itemsToShow: 2 },
      { width: 768, itemsToShow: 3 },
      { width: 1200, itemsToShow: 4 }
    ];
    return (
      <main className="rt-main">
        {this.props.slider ? (
          <Carousel itemsToShow={this.state.items} breakPoints={breakPoints}>
          {resp}
            </Carousel>
        ) : (
            <div className="rt-cardholder">{resp}</div>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  data: state.videoReducer.data
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
