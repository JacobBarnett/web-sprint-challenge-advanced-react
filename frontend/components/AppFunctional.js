import { handleRequest } from "msw";
import React, { useState } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const [count, setCount] = useState(0);
  const [{ x, y }, setCords] = useState({ x: 2, y: 2 });
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  function move(newX, newY) {
    if (newX < 1) {
      setMsg("You can't go left");
      return;
    }
    if (newX > 3) {
      setMsg("You can't go right");
      return;
    }
    if (newY < 1) {
      setMsg("You can't go up");
      return;
    }
    if (newY > 3) {
      setMsg("You can't go down");
      return;
    }
    setCount(count + 1);
    setCords({ x: newX, y: newY });
    setMsg("");
  }
  const grid = [];
  for (let yy = 1; yy <= 3; yy++) {
    for (let xx = 1; xx <= 3; xx++) {
      if (x === xx && y === yy) {
        grid.push(
          <div
            data-testid="active-square"
            key={`${xx}-${yy}`}
            className="square active"
          >
            B
          </div>
        );
      } else {
        grid.push(<div key={`${xx}-${yy}`} className="square" />);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x,
        y,
        email,
        steps: count,
      })
      .then((response) => {
        setMsg(response.data.message);
      })
      .catch((e) => {
        setMsg(e.response.data.message);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({x}, {y})
        </h3>
        <h3 data-testid="moved" id="steps">
          You moved {count} times
        </h3>
      </div>
      <div id="grid">{grid}</div>
      <div className="info">
        <h3 id="message">{msg}</h3>
      </div>
      <div id="keypad">
        <button
          data-testid="move-left"
          id="left"
          onClick={() => move(x - 1, y)}
        >
          LEFT
        </button>
        <button data-testid="move-up" id="up" onClick={() => move(x, y - 1)}>
          UP
        </button>
        <button id="right" onClick={() => move(x + 1, y)}>
          RIGHT
        </button>
        <button id="down" onClick={() => move(x, y + 1)}>
          DOWN
        </button>
        <button
          data-testid="reset-number"
          id="reset"
          onClick={() => {
            setCords({ x: 2, y: 2 });
            setCount(0);
            setMsg("");
            setEmail("");
          }}
        >
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
