import React, { Component } from 'react';
import * as d3 from 'd3';

class DragLine extends Component {
  componentDidMount() {
  d3.drag().on('start', function(){ return d3.select(this).raise() })
    .on('drag', function(){
      let dx = d3.event.sourceEvent.clientX
      let _x = dx - this.props.margin.left
      let _base = 0
      let _width = this.props.width
      let _offset = _x < _base ? _base : _x > _width ? _width : _x
      d3.select('foreignObject').attr('width', _offset)
      d3.select(this)
        .attr('transform', () => {
          return `translate(${_offset})`
        })
    })
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

export default DragLine
