import React, { Component, useState, useEffect } from "react";
import "./App.css";

class GridBlock extends Component {
  render() {
    const { row, col } = this.props;
    return <div className="grid-block" id={`grid-${row}-${col}`}></div>;
  }
}
export default GridBlock;
