import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import FileSaver from 'file-saver';
import activity_data from '../activity-data.json';
import {
  Container,
  Button,
  Menu
} from 'semantic-ui-react'

class Charts extends Component {

  constructor(props) {
    super(props)

    this.state = {
        lineData: [],
        barData: []
    }
    this.intervals = [];
  }

  componentWillMount(){

    localStorage.setItem('chartData', JSON.stringify(activity_data));

    this.setState({
        lineData:JSON.parse(localStorage.getItem('chartData')).lineData, 
        barData:JSON.parse(localStorage.getItem('chartData')).barData
    })
  }

  componentDidMount() {

    let that = this;

    let charts = ['line', 'bar'];

    charts.forEach(function(chart){

      let start = 10;

      let intervalId = setInterval(function() {

        let x = start++;

        if (chart === 'line'){
          let y = Math.random();

          let chartLine = that.refs.chartLine.getChart();
          chartLine.series[0].addPoint([x,y], true, true);

          let newData = JSON.parse(localStorage.getItem('chartData'));
          newData.lineData.push({x,y});
          localStorage.setItem('chartData', JSON.stringify(newData));
        }

        if (chart === 'bar'){
          let y = Math.random();

          let chartBar = that.refs.chartBar.getChart();
          chartBar.series[0].addPoint([x,y], true, true);

          let newData = JSON.parse(localStorage.getItem('chartData'));
          newData.barData.push({x,y});
          localStorage.setItem('chartData', JSON.stringify(newData));
        }
        
  
      }, 5000);

      that.intervals.push(intervalId);
      
    });
  }

  componentWillUnmount(){

    this.intervals.forEach(function(element){
      clearInterval(element);
    });

    localStorage.removeItem('chartData')
  }

  download(){

    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    let blob = new Blob([localStorage.getItem('chartData')], {type: "application/json"});
    FileSaver.saveAs(blob, "activity-data-logs-"+ hours + "_" + minutes + "_" + seconds + "_" + day + "_" + month + "_" + year +".json")			;
  }

  render() {
    
    let { lineData, barData } = this.state

    const configForLine = {
      chart: {
          type: 'line'
      },
      series: [{
        data: lineData,
        name: 'Line data'
      }],
      plotOptions: {
        series: {
            color: '#FF0000'
        }
      },
      title: {
        text: 'Line chart'
      }
    }

    const configForBar = {
      chart: {
        type: 'bar'
      },
      series: [{
        data: barData,
        name: 'Bar data'
      }],
      plotOptions: {
        series: {
            color: '#0000FF'
        }
      },
      title: {
        text: 'Bar chart'
      }
    }

    return (
        <div>
            <Menu fixed='left' vertical style={{ zIndex: '-1', paddingTop: '7em' }}>
              <Container>
                <Menu.Item as='h3'>
                  A single page application that displays charts to simulate an activity in real-time using the activity-data.json file. (Every 5 seconds)
                </Menu.Item>
              </Container>
            </Menu>
            <div className='other-container'>
              <Container>
                  <ReactHighcharts config = {configForLine} ref="chartLine"></ReactHighcharts>
                  <ReactHighcharts config = {configForBar} ref="chartBar"></ReactHighcharts>
                  <Button secondary onClick={this.download}>Download Data Logs</Button>
              </Container>
            </div>
        </div>
    );
  }
}

export default Charts;
