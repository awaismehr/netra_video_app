import React, { Component } from "react";
import { connect } from "react-redux";

export class index extends Component {
  render() {
    return <div>sidebar</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
