import React from 'react'
import PropTypes from 'prop-types';

const PanelHeader = (props) => {
  return (
    <div className="panel-header">
      <div className="pull-left panel-title">{props.title}</div>
                <div className="pull-right line-height-30">
                    {props.children}
                </div>
    </div>
  )
}

PanelHeader.propTypes = {
  title: PropTypes.string
}

export default PanelHeader
