import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart, AreaChart } from 'react-d3-components';
import * as d3 from 'd3';
import MainContainer from './MainContainer';

const data = [
  {
  label: 'somethingA',
  values: [{x: 0, y: 2, color: 'red' }, {x: 1.3, y: 5, color: 'red'}, {x: 3, y: 6, color: 'red'}, {x: 3.5, y: 6.5}, {x: 4, y: 6}, {x: 4.5, y: 6 }, {x: 5, y: 7, color: 'blue'}, {x: 5.5, y: 8, color: 'blue' }]
  },
];


class App extends React.Component {

  componentDidMount() {
    // console.log('asdfjdsaf', d3.select('.chart'))
    // let grad = d3.select('svg').append('defs')
    //   .append('linearGradient')
    //   .attr('id', 'grad')
    //   grad.append("stop").attr("offset", "0%").attr("stop-color", "yellow");
    //   grad.append("stop").attr("offset", "10%").attr("stop-color", "yellow");
    //   grad.append("stop").attr("offset", "10%").attr("stop-color", "red");
    //   grad.append("stop").attr("offset", "20%").attr("stop-color", "red");
    //   d3.select('svg').append('path')
    //     .style('fill', 'url(#grad)')
  }

  render() {
    const scale = value => {
      console.log('value', value)
      return 'red'
    }
    return (
      <div className="App">
        {/* <AreaChart
          data={data}
          width={800}
          height={400}
          y0Orientation="left"
          margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
          ref={r => {
            this.graph = r;
          }}
          colorScale={scale}
          id="graph"
        /> */}
        <MainContainer />
      </div>
    );
  }
}

export default App;
