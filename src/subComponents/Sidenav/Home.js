import React, { Component } from "react";
import { connect } from "react-redux";

export class Home extends Component {
  render() {
    return <div>home</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
