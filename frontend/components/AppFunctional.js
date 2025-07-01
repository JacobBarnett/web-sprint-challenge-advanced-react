import React, { useState } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [steps, setSteps] = useState(0);
  const [index, setIndex] = useState(4);

  const gridSize = 3;

  function getXY() {
    const x = (index % gridSize) + 1;
    const y = Math.floor(index / gridSize) + 1;
    return { x, y };
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setMessage("");
    setEmail("");
    setSteps(0);
    setIndex(4);
  }

  function getNextIndex(direction) {
    const row = Math.floor(index / 3);
    const col = index % 3;

    switch (direction) {
      case "left":
        return col > 0 ? index - 1 : index;
      case "right":
        return col < 2 ? index + 1 : index;
      case "up":
        return row > 0 ? index - 3 : index;
      case "down":
        return row < 2 ? index + 3 : index;
      default:
        return index;
    }
  }

  function move(evt) {
    const direction = evt.target.id;
    const next = getNextIndex(direction);

    if (next === index) {
      setMessage(`You can't go ${direction}`);
    } else {
      setIndex(next);
      setSteps(steps + 1);
      setMessage("");
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  async function onSubmit(evt) {
    evt.preventDefault();
    const { x, y } = getXY();

    try {
      const res = await axios.post("http://localhost:9000/api/result", {
        x,
        y,
        steps,
        email,
      });

      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong.");
      }
    }
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">
          You moved {steps} {steps === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={onChange}
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
