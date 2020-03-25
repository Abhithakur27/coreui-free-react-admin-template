import React, { Component } from "react";
import { ColumnChart } from "react-chartkick";
import "chart.js";

export default class Columng extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ color: "red" }}>
        <ColumnChart data={this.props.dayWiseData} />
      </div>
    );
  }
}
