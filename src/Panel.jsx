import React from 'react'

const Panel = (props) => {
  return (
    <div className="bg">
      {props.children}
    </div>
  )
}

export default Panel;
