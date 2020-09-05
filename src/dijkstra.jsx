import React, { Component } from "react";
import "./App.css";

const grid = [];
//let isWall = [];
/* let gridblock = {
  className: "grid-block",
  isvisited: false,
  prev_value: null,
  isWall: false,
  distance: Infinity,
}; */

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
let s = "false";
let x = <div></div>;
let y = <div isvisited={s}></div>;
let z = <x className="grid-block">hello</x>;
s = "true";
let y1 = <div isvisited={s}></div>;
/* function gridMaker() {
  for (let i = 1; i <= grid_row; i++) {
    const row = [];
    for (let j = 1; j <= grid_col; j++) {
      let x = new GridBlock(
        `grid-${i}-${j}`,
        "grid-block",
        false,
        null,
        false,
        Infinity
      );
      row.push(<div>{x}</div>);
    }
    grid.push(row);
  }
  return grid;
}

function GridBlock(id, className, isvisited, prev_value, isWall, distance) {
  //  gridblock.id = `grid-${row}-${col}`;
  this.id = id;
  this.className = className;
  this.isvisited = isvisited;
  this.prev_value = prev_value;
  this.isWall = isWall;
  this.distance = distance;
}
*/
//***********************************************************************************************************//
class Hope extends Component {
  state = {};

  /*****************************************/
  shortestPath() {
    console.log(Object.isExtensible(x));
    console.log("y", Object.isExtensible(y), y.isvisited);
    console.log(Object.isExtensible(z));
    console.log("y1", Object.isExtensible(y1), y1.isvisited);
  }
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
