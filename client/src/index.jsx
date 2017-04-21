import React from 'react'
import ReactDOM from 'react-dom'

const testElement = (
  <div>
    <h1>hello world from a react element!</h1>
  </div>
)

ReactDOM.render(
  testElement,
  document.getElementById('root')
)
