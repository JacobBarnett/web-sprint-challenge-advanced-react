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
    e.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: x + 1,
        y: y + 1,
        email,
        steps: count,
      })
      .then((response) => {
        this.setState({ msg: response.data.message });
      })
      .catch((e) => {
        this.setState({ msg: e.response.data.message });
      });
  }
  reset() {
    this.setState({ count: 0, x: 1, y: 1, msg: "", email: "" });
  }
  move(xMove, yMove) {
    const { count, x, y } = this.state;
    let newX = x + xMove;
    let newY = y + yMove;
    if (newX < 0) {
      this.setState({ msg: "You can't go left" });
      return;
    }
    if (newX > 2) {
      this.setState({ msg: "You can't go right" });
      return;
    }
    if (newY < 0) {
      this.setState({ msg: "You can't go up" });
      return;
    }
    if (newY > 2) {
      this.setState({ msg: "You can't go down" });
      return;
    }

    this.setState({ count: count + 1, x: newX, y: newY, msg: "" });
  }
  render() {
    const { count, x, y } = this.state;
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({x + 1}, {y + 1}){" "}
          </h3>
          <h3 id="steps">
            You moved {count} {count === 1 ? "time" : "times"}
          </h3>
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
