import React, { Component } from "react";
import "./App.css";

const grid = [];
let isWall = [];

let wall_maker = false;
let start_row = 10;
let stop_row = 10;
let start_col = 10;
let stop_col = 40;
let start_change = false;
let stop_change = false;

function gridMaker() {
  for (let i = 1; i <= 20; i++) {
    const row = [];
    for (let j = 1; j <= 50; j++) {
      row.push(GridBlock(i, j));
    }
    grid.push(row);
    grid.push(<div></div>);
  }
  return grid;
}

function GridBlock(row, col) {
  return <div className="grid-block" id={`grid-${row}-${col}`}></div>;
}
function Color() {
  let x = document.getElementById(`grid-${start_row}-${start_col}`);
  x.classList.add("grid-start");
  let y = document.getElementById(`grid-${stop_row}-${stop_col}`);
  y.classList.add("grid-stop");
}

class Grid extends Component {
  state = {};

  handleMouseOut(e) {
    if (start_change) {
      let x = document.getElementById(e.target.id);
      if (x !== null) {
        x.classList.remove("grid-start");
        //   console.log("mouse out", e.target.id);
      }
    }
    if (stop_change) {
      let x = document.getElementById(e.target.id);
      if (x !== null) {
        x.classList.remove("grid-stop");
        //   console.log("mouse out", e.target.id);
      }
    }
  }

  handleMouseOver(e) {
    if (start_change) {
      let x = document.getElementById(e.target.id);
      if (x !== null) x.classList.add("grid-start");
    }
    if (stop_change) {
      let x = document.getElementById(e.target.id);
      if (x !== null) x.classList.add("grid-stop");
    }
    if (wall_maker) {
      if (
        e.target.id !== `grid-${start_row}-${start_col}` &&
        e.target.id !== `grid-${stop_row}-${stop_col}`
      ) {
        let x = document.getElementById(e.target.id);
        if (x !== null) {
          x.classList.add("wall");
        }
      }
    }
  }

  handleMouseDown(e) {
    if (e.target.id == `grid-${start_row}-${start_col}`) {
      start_change = true;
      let x = document.getElementById(e.target.id);
      x.classList.remove("grid-start");
    } else if (e.target.id == `grid-${stop_row}-${stop_col}`) {
      stop_change = true;
      let x = document.getElementById(e.target.id);
      x.classList.remove("grid-stop");
    } else {
      let x = document.getElementById(e.target.id);
      x.classList.add("wall");
      isWall.push(e.target.id);
      wall_maker = true;
    }
  }

  handleMouseUp(e) {
    if (start_change) {
      let i_d = e.target.id;
      let m = i_d.match(/(\d+)/g);
      start_row = parseInt(m[0], 10);
      start_col = parseInt(m[1], 10);
      //  console.log(start_row, start_col);
      start_change = false;
      Color();
    } else if (stop_change) {
      let i_d = e.target.id;
      let m = i_d.match(/(\d+)/g);
      stop_row = parseInt(m[0], 10);
      stop_col = parseInt(m[1], 10);
      //  console.log(stop_row, stop_col);
      stop_change = false;
      Color();
    } else {
      let x = document.getElementById(e.target.id);
      if (
        e.target.id !== `grid-${start_row}-${start_col}` &&
        e.target.id !== `grid-${stop_row}-${stop_col}`
      ) {
        x.classList.add("wall");
        isWall.push(e.target.id);
        wall_maker = false;
      }
    }
  }

  componentDidMount() {
    Color();
    this.handleMouseOver();
  }

  render() {
    return (
      <div
        className="grid button"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {gridMaker()}
      </div>
    );
  }
}

export default Grid;
