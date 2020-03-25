// import React from "react";
// import { Bar } from "react-chartjs-2";

// export default class Graph extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {}

//   render() {
//     console.log("THis props", this.props);

//     const state = {
//       labels: this.props.label || [],
//       datasets: [
//         {
//           backgroundColor: "#33ccff",
//           label: "Total Case",
//           borderColor: "rgba(0,0,0,1)",
//           borderWidth: 2,
//           data: this.props.data || []
//         }
//       ]
//     };
//     return (
//       <div>
//         <Bar
//           data={state}
//           options={{
//             title: {
//               display: true,
//               text: "Corona Virus per month",
//               fontSize: 20
//             },
//             legend: {
//               display: true,
//               position: "right"
//             }
//           }}
//         />
//       </div>
//     );
//   }
// }
