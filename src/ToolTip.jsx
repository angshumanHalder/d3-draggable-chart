import React from 'react'
import PropTypes from 'prop-types';

const ToolTip = (props) => {
  console.log('asfdkasdvkfa', props)
  let visibility = 'hidden';
  let transform = '';
  let x = 0;
  let y = 0;
  let width = 150, height = 70;
  let transformText = `translate(${width / 2}, ${height / 2 - 5})`;
  let transformArrow = '';
  if (props.tooltip.display) {
    let position = props.tooltip.pos;
    x = position.x;
    y = position.y;
    visibility = 'visibile';

    if (y > height) {
      transform = `translate(${x - width / 2}, ${Math.round(y) + 20})`;
      transformArrow = `translate(${width / 2 - 20}, 0) rotate(180, 20, 0)`;
    }
  } else {
    visibility = 'hidden';
  }
    return (
      <g transform={transform}>
                <rect className={props.bgStyle} is width={width} height={height} rx="5" ry="5" visibility={visibility}/>
                <polygon className={props.bgStyle} is points="10,0  30,0  20,10" transform={transformArrow}
                         visibility={visibility}/>
                <text is visibility={visibility} transform={transformText}>
                    <tspan is x="0" className={props.textStyle1} textAnchor="middle">{props.xValue +" : "+props.tooltip.data.key}</tspan>
                    <tspan is x="0" className={props.textStyle2} textAnchor="middle" dy="25">{props.yValue +" : "+props.tooltip.data.value}</tspan>
                </text>
            </g>
    )
}

ToolTip.propTypes = {
  tooltip: PropTypes.object,
  bgStyle: PropTypes.string,
  textStyle1: PropTypes.string,
  textStyle2: PropTypes.string,
  xValue: PropTypes.string,
  yValue: PropTypes.string,
}

export default ToolTip;
