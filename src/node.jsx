import React, { Component } from "react";
import "./App.css";

//***********************************************************************************************************//
class Node extends Component {
  state = {};
  render() {
    const {
      row,
      col,
      isWall,
      isFinish,
      isStart,
      onMouseDown,
      onMouseUp,
      onMouseOver,
    } = this.props;
    let extraClassName = "grid-outline";
    if (isFinish) {
      extraClassName = "grid-stop";
    } else if (isStart) {
      extraClassName = "grid-start";
    } else if (isWall) {
      extraClassName = "wall";
    }
    return (
      <div
        id={`grid-${row}-${col}`}
        className={`grid-block  ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
        onMouseOver={() => onMouseOver(row, col)}
      ></div>
    );
  }
}

export default Node;
