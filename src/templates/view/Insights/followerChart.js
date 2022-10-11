import React from 'react'
import { Chart } from "react-google-charts";

function FollowerChart(props) {

  var followerData =[];
  var colourData = [];

  if(props.dummyChart === true){
    followerData = [
          ['Task',''],
          ['No data',1]
      ]
    colourData = [
          '#D3D3D3'
      ]
  }else{
    followerData = props.followerData;
    colourData = props.colourData;
  }

    var pieOptions = {
      title: '',
      pieHole: 0.7,
      pieSliceText:'none',
      colors: colourData,
      backgroundColor: 'none',
      legend: 'none'
    }

      return (
        <Chart
          width={'500px'}
          height={'500px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={followerData}
          options={pieOptions}
        /> 
      );
}
export default FollowerChart;