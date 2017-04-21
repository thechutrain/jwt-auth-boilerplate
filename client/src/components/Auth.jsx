import React from 'react'

class Auth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: ''
    }
  }
  render () {
    return (
      <div>
        <h1>Auth React Component</h1>
      </div>
    )
  }
}

export default Auth
