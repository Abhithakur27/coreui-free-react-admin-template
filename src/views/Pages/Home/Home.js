import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import Lineg from "../Lineg/Lineg";
import moment from "moment";
import Columng from "../Lineg/Columng";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: "",
      countryCase: "",
      worldDetails: {},
      dayWiseGraph: {},
      lineGraphData: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      countryName: e.target.value
    });
  }

  handleSubmit = e => {
    this.cityDetails();
    this.getCountryCaseByDate();
  };

  enterPressed = e => {
    if (e.which == 13) {
      this.handleSubmit();
    }
  };

  cityDetails = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${this.state.countryName}`,
        headers: {
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": "cfb67f194cmsh49e2dec00e3b50bp1c0cf6jsnf6118d8e8576"
        }
      });
      console.log(data);
      this.setState({
        countryCase: data
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = () => {
    this.worldCase();
  };

  worldCase = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url:
          "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
        headers: {
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": "cfb67f194cmsh49e2dec00e3b50bp1c0cf6jsnf6118d8e8576"
        }
      });
      this.setState({
        worldDetails: data
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  renderBarGraph = data => {
    let arrData = [];

    let { stat_by_country = [] } = data;
    let objKey = {};

    for (const item of stat_by_country) {
      objKey[
        moment(item.record_date)
          .format("Do MMM")
          .toString()
      ] = parseInt(item.total_cases);
    }

    for (var i in objKey) {
      let arr = [];
      arr.push(i);
      arr.push(objKey[i]);
      arrData.push(arr);
    }
    this.setState({
      dayWiseGraph: {
        data: arrData
      }
    });
  };

  renderLineGraph = data => {
    let { stat_by_country } = data;
    let itemkey = {};
    for (let item of stat_by_country) {
      itemkey[
        moment(item.record_date)
          .fromNow()
          .toString()
      ] = parseInt(item.total_cases);
    }

    this.setState({
      lineGraphData: itemkey
    });
  };

  getCountryCaseByDate = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${this.state.countryName}`,
        headers: {
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key": "cfb67f194cmsh49e2dec00e3b50bp1c0cf6jsnf6118d8e8576"
        }
      });

      this.renderBarGraph(data);

      this.renderLineGraph(data);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    let { countryCase, worldDetails } = this.state;
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <div
                      style={{
                        padding: "10px",
                        backgroundColor: "#008dc9",
                        color: "white"
                      }}
                    >
                      <h1>Coronavirus disease (COVID-19) outbreak</h1>
                    </div>

                    <footer className="blockquote-footer"></footer>
                  </blockquote>
                </div>
              </div>

              <Row>
                <Col>
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-text ">Total Cases</h5>
                      <h2
                        className="card-title text-primary"
                        style={{ fontSize: "40px", fontWeight: 500 }}
                      >
                        {worldDetails.total_cases}
                      </h2>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">Total recovered</h5>
                      <p className="card-text">
                        <h2
                          className="card-title text-primary"
                          style={{ fontSize: "40px", fontWeight: 500 }}
                        >
                          {worldDetails.total_recovered}
                        </h2>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">New cases</h5>
                      <p className="card-text">
                        <h2
                          className="card-title text-primary"
                          style={{ fontSize: "40px", fontWeight: 500 }}
                        >
                          {worldDetails.new_cases}
                        </h2>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">Total Deaths</h5>
                      <p className="card-text">
                        <h2
                          className="card-title text-primary "
                          style={{
                            fontSize: "40px",
                            fontWeight: 500,
                            Color: "red"
                          }}
                        >
                          {worldDetails.total_deaths}
                        </h2>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">New Death</h5>
                      <h2
                        className="card-title text-primary"
                        style={{ fontSize: "40px", fontWeight: 700 }}
                      >
                        {worldDetails.new_deaths}
                      </h2>
                    </div>
                  </div>
                </Col>
              </Row>

              <div>
                <h1>Corona Virus cases</h1>
                <div style={{ marginTop: "2%" }}>
                  <div
                    className="input-group input-group-lg"
                    style={{ marginTop: "2%" }}
                  >
                    <div className="input-group input-group-lg">
                      <input
                        type="text"
                        className="form-control"
                        name=""
                        placeholder="Country search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={this.handleChange}
                        onKeyPress={this.enterPressed}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary btn-lg"
                          type="button"
                          onClick={this.handleSubmit}
                        >
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mt-5">
              <Columng dayWiseData={this.state.dayWiseGraph.data} />
            </div>
          </div>
        </div>
        <div className="container-fluid ">
          <Row>
            <div className="col-md-6">
              <div>
                <div>
                  {countryCase.latest_stat_by_country &&
                    countryCase.latest_stat_by_country.map(e => {
                      return (
                        <>
                          <table
                            className="table table-bordered mt-5"
                            style={{ backgroundColor: "#fff" }}
                          >
                            <thead>
                              <tr>
                                <td>
                                  <h3>country</h3>
                                </td>
                                <td
                                  style={{
                                    fontSize: "35px",
                                    paddingLeft: "10px",
                                    fontWeight: 500
                                  }}
                                >
                                  {e.country_name}
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <h3>Total cases</h3>
                                </td>
                                <td
                                  style={{
                                    fontSize: "35px",
                                    paddingLeft: "10px",
                                    fontWeight: 500
                                  }}
                                >
                                  {e.total_cases}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h3>Active cases</h3>
                                </td>
                                <td
                                  style={{
                                    fontSize: "35px",
                                    paddingLeft: "10px",
                                    fontWeight: 500
                                  }}
                                >
                                  {e.active_cases}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h3>Total death</h3>
                                </td>
                                <td
                                  style={{
                                    fontSize: "35px",
                                    paddingLeft: "10px",
                                    fontWeight: 500,
                                    color: "red"
                                  }}
                                >
                                  {e.total_deaths}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h3>Total recovered</h3>
                                </td>
                                <td
                                  style={{
                                    fontSize: "35px",
                                    paddingLeft: "10px",
                                    fontWeight: 500
                                  }}
                                >
                                  {e.total_recovered}
                                </td>
                              </tr>

                              <tr>
                                <td>
                                  <h3>New deaths</h3>
                                </td>
                                <td
                                  style={{
                                    fontSize: "35px",
                                    paddingLeft: "10px",
                                    fontWeight: 500
                                  }}
                                >
                                  {e.new_deaths}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h3>Serious critical</h3>
                                </td>
                                <td
                                  style={{
                                    fontSize: "35px",
                                    paddingLeft: "10px",
                                    fontWeight: 500
                                  }}
                                >
                                  {e.serious_critical}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-5">
              <Lineg data={this.state.lineGraphData} />
            </div>
          </Row>
        </div>
      </>
    );
  }
}
