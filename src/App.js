import React, { Component } from 'react';
import './App.css';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => {
  let min = 1
  let max = 98
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y]
}

const initialState = {
  direction: "RIGHT",
  food: getRandomCoordinates(),
  speed: 200,
  snakeDots: [
    [0, 0],
    [2, 0]
  ]
}



class App extends Component {

  state = initialState

  componentDidMount() { // This one is called immediately after a component has been mounted 
    setInterval(this.moveSnake, this.state.speed)
    document.onkeydown = this.onKeyDown
  }

  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: 'UP' })
        break
      case 40:
        this.setState({ direction: "DOWN" })
        break
      case 37:
        this.setState({ direction: "LEFT" })
        break
      case 39:
        this.setState({ direction: "RIGHT" })
        break
    }
  }

  componentDidUpdate = () => { // This always keeps on checking the the game window has updated
    this.checkOutOfBounds()
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots]
    let head = dots[dots.length - 1]
    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break
      case 'UP':
        head = [head[0], head[1] - 2]
        break
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break
    }
    dots.push(head)
    dots.shift()
    this.setState({ snakeDots: dots })
  }

  checkOutOfBounds = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver()
    }
  }

  gameOver = () => {
    alert("Game Over, Length is : " + this.state.snakeDots.length)
    this.setState(initialState)
  }

  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>

    );
  }

}

export default App;
