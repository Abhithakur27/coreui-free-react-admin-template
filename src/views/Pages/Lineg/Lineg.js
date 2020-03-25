import React, { Component } from "react";
import { LineChart, PieChart } from "react-chartkick";
import "chart.js";

export default class Lineg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("data for line graph", this.props);
    return (
      <div>
        <LineChart data={this.props.data} />
        {/* <ColumnChart data={this.props.dayWiseData} /> */}
      </div>
    );
  }
}
