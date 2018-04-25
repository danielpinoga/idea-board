import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const FormWrapper = styled.div`
  
  display: flex;
  flex-direction: column;
  
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: yellow;
  color: white;
  border: 2px solid white;
  button {
    background-color: #123456;
    color: white;
  }
`
const StyledButton = styled.button`
background-color: #123456;
color: white;
    background-color: #123456;
    color: white;
`
const IdeaContainer = styled.span`
background-color:yellow;
margin: 5px;
`

class IdeaPage extends Component {

  state = {
    user: {
      userName: 'Bob'
    },
    ideas: [{
      id: 1,
      title: 'hello',
      description: 'world'
    }, {
      id: 2,
      title: 'hola',
      description: 'mundo'
    }, {
      id: 3,
      title: 'goodnight',
      description: 'moon'
    }, {
      id: 4,
      title: 'greetings',
      description: 'earthlings'
    }]
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    console.log(userId)
    axios.get(`/api/users/${userId}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          user: response.data,
          ideas: response.data.ideas
        })
      })
  }

  createNewIdea = () => {
    const userId = this.state.user._id
    const url = `/api/users/${userId}/ideas`
    console.log("CREATE IDEA ROUTE BEING CALLED", url)
    axios.post(url)
      .then((res) => {
        console.log("RESPONSE FROM NEW IDEA", res.data)
      })
  }

  render() {
    console.log("RENDERING", this.state.user)
    const ideas = this.state.ideas.map((idea, i) => {
      return (
        <FormWrapper key={i}>
          <input type="text" name="title" value={idea.title} onChange={this.handleChange} />
          <textarea name="description" value={idea.description} onChange={this.handleChange} />
          <button>Delete Idea</button>
        </FormWrapper>
      )
    })

    return (
      <div>
        <div>
          <h1>{this.state.user.userName}'s Idea Board</h1>
          <StyledButton onClick={this.createNewIdea}>New Idea</StyledButton>
        </div>
        <IdeaContainer>
          {ideas}
        </IdeaContainer>
      </div>
    )
  }
}

export default IdeaPage