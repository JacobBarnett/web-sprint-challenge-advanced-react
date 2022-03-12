import React from "react";
import { useState } from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      x: 1,
      y: 1,
      email: "",
      msg: "",
    };
  }
  async saveScore(e) {
    e.preventDefault();
    const { count, x, y, email } = this.state;
    const result = await axios.post("http://localhost:9000/api/result", {
      steps: count,
      x,
      y,
      email,
    });
    this.setState({ msg: result.data.message });
  }
  reset() {
    this.setState({ count: 0, x: 1, y: 1 });
  }
  move(xMove, yMove) {
    const { count, x, y } = this.state;
    let newX = x + xMove;
    let newY = y + yMove;
    let moved = true;

    if (newX < 0) {
      newX = 0;
    } else if (newX > 2) {
      newX = 2;
    }
    if (newY < 0) {
      newY = 0;
    } else if (newY > 2) {
      newY = 2;
    }
    if (newX === x && newY === y) {
      moved = false;
    }

    if (moved) {
      this.setState({ count: count + 1, x: newX, y: newY });
    }
  }
  render() {
    const { count, x, y } = this.state;
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved {count} times</h3>
        </div>
        <div id="grid">
          <div className={`square ${x === 0 && y === 0 && "active"}`}>
            {x === 0 && y === 0 && "B"}
          </div>
          <div className={`square ${x === 1 && y === 0 && "active"}`}>
            {x === 1 && y === 0 && "B"}
          </div>
          <div className={`square ${x === 2 && y === 0 && "active"}`}>
            {x === 2 && y === 0 && "B"}
          </div>
          <div className={`square ${x === 0 && y === 1 && "active"}`}>
            {x === 0 && y === 1 && "B"}
          </div>
          <div className={`square ${x === 1 && y === 1 && "active"}`}>
            {x === 1 && y === 1 && "B"}
          </div>
          <div className={`square ${x === 2 && y === 1 && "active"}`}>
            {x === 2 && y === 1 && "B"}
          </div>
          <div className={`square ${x === 0 && y === 2 && "active"}`}>
            {x === 0 && y === 2 && "B"}
          </div>
          <div className={`square ${x === 1 && y === 2 && "active"}`}>
            {x === 1 && y === 2 && "B"}
          </div>
          <div className={`square ${x === 2 && y === 2 && "active"}`}>
            {x === 2 && y === 2 && "B"}
          </div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.msg}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => this.move(-1, 0)} id="left">
            LEFT
          </button>
          <button onClick={() => this.move(0, -1)} id="up">
            UP
          </button>
          <button onClick={() => this.move(1, 0)} id="right">
            RIGHT
          </button>
          <button onClick={() => this.move(0, 1)} id="down">
            DOWN
          </button>

          <button onClick={() => this.reset()} id="reset">
            reset
          </button>
        </div>
        <form onSubmit={(e) => this.saveScore(e)}>
          <input
            onChange={(e) => this.setState({ email: e.target.value })}
            value={this.state.email}
            id="email"
            type="email"
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
