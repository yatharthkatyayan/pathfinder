import React, { Component } from "react";
import "./App.css";
import Node from "./node.jsx";

const grid = [];

let wall_maker = false;
let start_row = 10;
let stop_row = 10;
let start_col = 10;
let stop_col = 40;
let start_change = false;
let stop_change = false;
let unvisited_grid = [];
let grid_row = 20;
let grid_col = 50;
let start;

//***********************************************************************************************************//
class Hope extends Component {
  state = {};

  /*****************************************/
  /*  shortestPath() {
    console.log("hi");
    console.log("x", Object.isExtensible(x));
  } */
  /*************************************/

  render() {
    return (
      <div
        className="grid button"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <button className="button-style" onClick={this.shortestPath}>
          click me
        </button>
      </div>
    );
  }
}

export default Hope;
