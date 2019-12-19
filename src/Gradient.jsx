import React from 'react';
import PropTypes from 'prop-types';

class Gradient extends React.Component {

  render() {
    console.log('sdkfasf', this.props.color2)
    return (
      <defs>
                <linearGradient is="true" id={this.props.id} x1="0%" y1="100%" x2="0%" y2="0%" spreadMethod="pad">
                    <stop is="true" offset="10%" stopColor={this.props.color1} stopOpacity={.4}/>
                    <stop is="true" offset="80%" stopColor={this.props.color2} stopOpacity={1}/>
                </linearGradient>
            </defs>
    )
  }
}

Gradient.propTypes = {
  id: PropTypes.string,
  color1: PropTypes.string,
  color2: PropTypes.string,
}

export default Gradient;
