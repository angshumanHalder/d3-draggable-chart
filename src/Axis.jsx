import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Axis extends React.Component {

  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis = () => {
    console.log('sldflaskjdf', this.props.orient)
    if (this.props.orient === 'top') {
      this.axis = d3.axisTop()
        .scale(this.props.scale)
        .ticks(this.props.ticks);
      } else if (this.props.orient === 'bottom') {
        this.axis = d3.axisBottom()
          .scale(this.props.scale)
          .ticks(this.props.ticks);
    } else if (this.props.orient === 'left') {
      this.axis = d3.axisLeft()
          .scale(this.props.scale)
          .ticks(this.props.ticks);
    } else if (this.props.orient === 'right') {
      this.axis = d3.axisRight()
          .scale(this.props.scale)
          .ticks(this.props.ticks);
    }
    
    if (this.props.tickFormat !== null && this.props.axisType === 'x') {
      this.axis.tickFormat(d3.timeFormat(this.props.tickFormat));
    }

    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis);
  }

  render() {
    let translate = `translate(0, ${this.props.h})`;
    return (
      <>
        <g className={this.props.className} transform={this.props.axisType === 'x' ? translate : ''}></g>
      </>
    )
  }

}

Axis.propTypes = {
  h: PropTypes.number,
  scale: PropTypes.func,
  axisType: PropTypes.oneOf(['x', 'y']),
  orient: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  className: PropTypes.string,
  tickFormat: PropTypes.string,
  ticks: PropTypes.number,
}

export default Axis;