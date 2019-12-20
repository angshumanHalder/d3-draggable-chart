import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class DragLine extends Component {
  componentDidMount() {
    let _self = this;
    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(d3.drag().on('start', function() { return d3.select(_self).raise() })
    .on('drag', function() {
      let dx = d3.event.sourceEvent.clientX
      let _x = dx - _self.props.margin.left
      let _base = 0
      let _width = _self.props.width
      let _offset = _x < _base ? _base : _x > _width ? _width : _x
      d3.select(node).attr('width', _offset)
      d3.select(node)
        .attr('transform', () => {
          return `translate(${_offset})`
        })
    }))
  }


  drawDragLine = () => {
    this.x = d3.scaleTime().rangeRound([0, this.props.width]);
    this.y = d3.scaleLinear().rangeRound([this.props.height, 0]);
  }

  render() {
    this.drawDragLine();
    return (
      <path className="drag-line" id="dragline1" d={`M${0},${this.y(0)}L${0},0`} stroke="lightgrey" strokeWidth={3}></path>
    )
  }
}

export default DragLine;
