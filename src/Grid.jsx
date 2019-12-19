import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Grid extends Component {
  componentDidUpdate() {
    this.renderGrid();
  }

  componentDidMount() {
    this.renderGrid();
  }

  renderGrid = () => {
    console.log('sfashlf', this.props.orient)
    if (this.props.orient === 'top') {
      this.grid = d3.axisTop()
      .scale(this.props.scale)
      .ticks(this.props.ticks)
      .tickSize(-this.props.len, 0, 0)
      .tickFormat('');
    } else if (this.props.orient === 'bottom') {
      this.grid = d3.axisBottom()
      .scale(this.props.scale)
      .ticks(this.props.ticks)
      .tickSize(-this.props.len, 0, 0)
      .tickFormat('');
    } else if (this.props.orient === 'left') {
      this.grid = d3.axisLeft()
        .scale(this.props.scale)
        .ticks(this.props.ticks)
        .tickSize(-this.props.len, 0, 0)
        .tickFormat('');
    } else if (this.props.orient === 'right') {
      this.grid = d3.axisRight()
        .scale(this.props.scale)
        .ticks(this.props.ticks)
        .tickSize(-this.props.len, 0, 0)
        .tickFormat('');
    }
    
    var node = ReactDOM.findDOMNode(this);
    console.log('sdfnadsf', node, d3.select(node), this.grid)
    d3.select(node).call(this.grid);
  }

  render() {
    let translate = `translate(0, ${this.props.h})`
    return ( 
        <g className={this.props.className} transform={this.props.gridType === 'x' ? translate : ''}></g>
    )
  }
}

Grid.propTypes = {
  h: PropTypes.number,
  len: PropTypes.number,
  scale: PropTypes.func,
  gridType: PropTypes.oneOf(['x', 'y']),
  orient: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  className: PropTypes.string,
  ticks: PropTypes.number,
}

export default Grid;
