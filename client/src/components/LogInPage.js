import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class LogIn extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    this.getAllUsers()
  }

  getAllUsers = () => {
    axios.get('/api/users')
      .then(res => {
        console.log("Saving users to state", res.data)
        this.setState({ users: res.data })
      })
      .catch(err => {
        console.error(err)
      })
  }

  createUser = () => {
    axios.post('/api/users', { user: this.state.user })
      .then((res) => {
        const users = [...this.state.users]
        users.push(res.data)
        this.setState({ users })
      })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    this.createUser()
  }

  handleChange = (event) => {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  render() {
    const userLinks = this.state.users.map((user, i) => {
      return (
        <div key={i}>
          <Link to={`/user/${user._id}`}>{user.userName}</Link>
        </div>)
    })

    return (
      <div>
        <div>
          <Link to='/'>Return Home</Link>
        </div>
        <h1>Log-In</h1>
        <h3>Please Select an Existing User</h3>
        {userLinks}
        <h1>Sign-Up</h1>
        <form onSubmit={this.handleSignUp}>
          <div>
            <label htmlFor="userName">User Name</label>
            <input onChange={this.handleChange} name="userName" type="text" value={this.state.userName} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} name="password" type="text" value={this.state.password} />
          </div>
          <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default LogIn