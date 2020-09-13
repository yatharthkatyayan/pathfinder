import React, { Component } from "react";
import "./App.css";

//***********************************************************************************************************//
class Node extends Component {
  state = {};
  render() {
    const { row, col, isWall, isFinish, isStart } = this.props;
    let extraClassName = "";
    if (isFinish) {
      extraClassName = "grid-stop";
    }
    if (isStart) {
      extraClassName = "grid-start";
    }
    if (isWall) {
      extraClassName = "wall";
    }
    return (
      <div
        id={`grid-${row}-${col}`}
        className={`grid-block ${extraClassName}`}
      ></div>
    );
  }
}

export default Node;
