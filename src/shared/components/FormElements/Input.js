import React from 'react'

import './Input.css'

const Input = props => {
  return (
    <div>
      <label>{props.label}</label>
      <input {...props} />
    </div>
  )
}
export default Input
