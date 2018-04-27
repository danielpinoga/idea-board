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
    axios.post(`/api/users/${this.state.user._id}/ideas`)
      .then((res) => {
        console.log("RESPONSE FROM NEW IDEA", res.data)
        this.setState({ ideas: res.data.ideas.reverse() })
      })
  }

  deleteIdea = (ideaId) => {
    axios.delete(`/api/users/${this.state.user._id}/ideas/${ideaId}`)
      .then((response) => {
        console.log(response)
      })
  }

  handleChange = (changedIdea, event) => {
    const ideas = [...this.state.ideas]
    const newIdeas = ideas.map((idea) => {
      if (idea._id === changedIdea._id) {
        idea[event.target.name] = event.target.value
      }
      return idea
    })
    this.setState({ ideas: newIdeas })
  }

  updateIdea = (idea) => {
    console.log("UPDATING IDEA IN DB")
    console.log("User Id being Updated", this.state.user._id)
    axios.patch(`/api/users/${this.state.user._id}/ideas/${idea._id}`, { idea })
      .then(res => {
        this.setState({ ideas: res.data.ideas })
      })
  }

  render() {
    console.log("RENDERING", this.state.user)
    const ideas = this.state.ideas.map((idea, i) => {
      return (
        <FormWrapper key={i}>
          <input
            type="text"
            name="title"
            value={idea.title}
            onBlur={() => this.updateIdea(idea)}
            onChange={(event) => this.handleChange(idea, event)} />

          <textarea
            name="description"
            value={idea.description}
            onBlur={() => this.updateIdea(idea)}
            onChange={(event) => this.handleChange(idea, event)} />

          <button
            onClick={() => { this.deleteIdea(idea._id) }}>
            Delete Idea
          </button>
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