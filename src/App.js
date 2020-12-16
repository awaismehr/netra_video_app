import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import * as actions from "./redux/actions";
import Home from "./pages/Home/Home";
import Recent from "./subComponents/Sidenav/recent";
import Favourite from "./subComponents/Sidenav/fav";
import Playvideo from "./pages/Playvideo/Playvideo";
import * as actions from "./redux/actions";

class App extends React.Component {
  componentDidMount() {
    this.props.getVideos(this.props.query);
  }
  render() {
    return (
      <Switch>
        <Route exact path="/video" component={Playvideo} />
        <Route exact path="/recent" component={Recent} />
        <Route exact path="/favourite" component={Favourite} />
        <Route exact path="/search" component={Home} />

        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  query: state.videoReducer.query
});

const mapDispatchToProps = {
  getVideos: actions.fetchvideoFromElastic
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
