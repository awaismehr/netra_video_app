import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import "./index.css";
import {withRouter} from "react-router-dom"
// import Card from "../sidevideolist/index";
import Image1 from "../../components/assets/images/image_1.jpg";
import Image2 from "../../components/assets/images/image_2.jpg";
import Card from "../../subComponents/videolist/videocard";
// import "../../redux/selectors"
export class index extends Component {
  // constructor(props){
  //     super(props)
  //     this.state.clickedIndex = this.props.clickedId
  // }

  // state = {
  //     clickedIndex : 0
  // }
  // itemClicked=(index)=>{
  //     console.log(index)
  //     this.setState({
  //         clickedIndex : index
  //     })
  // }

reditHandler=()=>{
  let path = `https://www.reddit.com/r/${this.props.subreddit}`;
  window.open(path,'redit')  //this will open new a link in new page
}

  render() {
    
    let resp = this.props.data.map((video, i) => {
      if (video._source.media == null || video._source.over_18) {
        return;
      }
      return <Card video={video} index={i} />;
    });
    let desc = this.props.description + this.props.thumb_title;
    
    return (
      <Fragment>
        <div class="rt-portfoliodetailarea">
          <div class="rt-portfoliodetailholder">
            <div class="rt-portfoliovideoarea">
              <div class="rt-portfoliopreview">
                <figure class="rt-previewplaceholder">
                  {/* <img src={Image1} alt="Full Preview Image" /> */}
                  <div
                    style={{}}
                    className="text-center"
                    dangerouslySetInnerHTML={{ __html: this.props.html }}
                  />
                  <div className="rt-playvideotitle">
                    <h3>
                      {this.props.title.substring(0, 55)}
                    </h3>
                    <p className="rt-text-center-1">{desc}</p>
                    <p className="rt-text-center-2">
                      <b>Posted</b> : {this.props.time}
                    </p>
                    <div className="rt-btnholder">
                      <span className="rt-cetagorie">history</span>
                      <span className="rt-red_cetagorie " onClick={this.reditHandler}>{this.props.subreddit}</span>
                    </div>
                    <label className="rt-relatedvideo__label">Related videos</label>
                  </div>  
                  {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/2_cBCSu2KDM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                </figure>
                {/* <p>{this.props.title}</p> */}
                {/* <div class="rt-portfoliodetailcontent"> */}
                {/* <ul class="rt-hashtags">
                    <li>
                      <a href="javascript:void(0);">#Shadow</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">#SoloDance</a>
                    </li>
                  </ul> */}
                {/* <div class="rt-videobtnactionstime">
                    <ul class="rt-timefilesize">
                      <li>
                        <span>10,015 Views</span>
                      </li>
                      <li>
                        <span>Oct 20, 2020</span>
                      </li>
                    </ul>
                    <ul class="rt-videovideoaction">
                      <li>
                        <a href="javascript:void(0);">
                          <i class="icon-edit"></i>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <i class="icon-share1"></i>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <i class="icon-delete"></i>
                        </a>
                      </li>
                    </ul>
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  html: state.videoPlayReducer.html,
  data: state.videoReducer.data,
  isLoading: state.videoReducer.isLoading,
  title: state.videoPlayReducer.title,
  time: state.videoPlayReducer.time,
  description: state.videoPlayReducer.description,
  thumb_title: state.videoPlayReducer.thumb_title,
   subreddit: state.videoPlayReducer.subreddit,
});

const mapDispatchToProps = {};

export default   withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(index));
