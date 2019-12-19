import React from 'react'
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const Dots = (props) => {
  let data = [];
  if (props.removeFirstAndLast) {
    for (let  i=1;i<this.props.data.length-1;++i){
      data[i-1]=this.props.data[i];
    }
  } else {
    data= props.data;
  }
  let circles = data.map((d, i) => {

    return (<circle className="dot" r={props.r} cx={props.x(d[props.xData])} cy={props.y(d[props.yData])}
                    key={i}
                    onMouseOver={props.showToolTip} onMouseOut={props.hideToolTip}
                    data-key={d3.timeFormat(props.format)(d[props.xData])} data-value={d[props.yData]}/>)
});
  return (
    <g>
    {circles}
</g>   
  )
}

Dots.propTypes = {
  data: PropTypes.array,
  xData: PropTypes.string.isRequired,
  yData: PropTypes.string.isRequired,
  x: PropTypes.func,
  y: PropTypes.func,
  r: PropTypes.string,
  format: PropTypes.string,
  removeFirstAndLast: PropTypes.bool
}

export default Dots
