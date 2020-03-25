import React, { Component, lazy, Suspense } from "react";

import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <card>
          <button type="button" className="btn btn-secondary">
            summit
          </button>
        </card>
      </div>
    );
  }
}

export default Dashboard;
