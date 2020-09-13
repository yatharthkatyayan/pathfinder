import React, { Component } from "react";
import "./App.css";
import Node from "./node.jsx";

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

function gridMaker() {
  const grid = [];
  for (let i = 1; i <= grid_row; i++) {
    const row = [];
    for (let j = 1; j <= grid_col; j++) {
      row.push(GridBlock(i, j));
      //  console.log(Object.isExtensible(row.length - 1));
      //  unvisited_grid.push(GridBlock(i, j));
    }
    grid.push(row);
    //  grid.push(<div></div>);
    //    let x = GridBlock(i, j);
  }
  return grid;
}

function GridBlock(r, c) {
  /* //  gridblock.id = `grid-${row}-${col}`;
  this.id = id;
  this.className = className;
  this.isvisited = isvisited;
  this.prev_value = prev_value;
  this.isWall = isWall;
  this.distance = distance; */
  return {
    //  className="grid-block"
    //  id={`grid-${row}-${col}`}
    row: r,
    col: c,
    isStart: r == start_row && c == start_col,
    isFinish: r == stop_row && c == stop_col,
    isvisited: false,
    prev_value: null,
    isWall: false,
    distance: Infinity,
  };
}
/*
function Color() {
  let x = document.getElementById(`grid-${start_row}-${start_col}`);
  x.classList.add("grid-start");
  let y = document.getElementById(`grid-${stop_row}-${stop_col}`);
  y.classList.add("grid-stop");
}
*/
///////////////////
/*
function sortNodesByDistance(unvisited_grid) {
  unvisited_grid.sort((gridA, gridB) => gridA.distance - gridB.distance);
}

function updateDis(neighbor, node) {
  for (const n of neighbor) {
    n.distance = node.distance + 1;
    n.prev_value = node;
  }
}
*/
/*
function getNeighbor(node) {
  let x = node.id;
  let m = x.match(/(\d+)/g);
  let x_row = parseInt(m[0], 10);
  let x_col = parseInt(m[1], 10);
  let neighbor = [];
  if (x_row > 1) {
    let y = Document.getElementById(`grid-${x_row - 1}-${x_col}`);
    neighbor.push(y);
  }
  if (x_row < grid_row) {
    let y = Document.getElementById(`grid-${x_row + 1}-${x_col}`);
    neighbor.push(y);
  }
  if (x_col > 1) {
    let y = Document.getElementById(`grid-${x_row}-${x_col - 1}`);
    neighbor.push(y);
  }
  if (x_col < grid_col) {
    let y = Document.getElementById(`grid-${x_row}-${x_col + 1}`);
    neighbor.push(y);
  }
  return neighbor.filter((neighbor) => !neighbor.isvisited);
}
*/
/*
let VisitedInOrder = [];
function traverseGrid(grid) {
  for (const row of grid) {
    for (const node of row) {
      unvisited_grid.push(node);
      //   console.log(Object.isExtensible(node));
    }
  }
  let x = (
    <div
      className="grid-block"
      isvisited={false}
      prev_value={null}
      isWall={false}
      distance={Infinity}
    ></div>
  );
  console.log(Object.isExtensible("x", x));
  //  console.log("geid-block", Object.isExtensible(gridblock));
  //  console.log(gridblock.isvisited);
  */
/* console.log("length : ", unvisited_grid.length);
  let i = 0;
  console.log("grid", Object.isExtensible(grid));
  console.log("unvisited_grid", Object.isExtensible(unvisited_grid)); */
/*
  let i = 0;
  while (!!unvisited_grid.length) {
    sortNodesByDistance(unvisited_grid);
    let node = unvisited_grid.shift();
    let n = unvisited_grid[i];
    i++;
    //console.log("node", Object.isExtensible(node));
    //  console.log("n", Object.isExtensible(n));
    /* if (node.isWall) continue;
    if (node.distance === Infinity) break;
    VisitedInOrder.push(node);
    //  node.isvisited = true;
    if (node.id === `grid-${stop_row}-${stop_col}`) break;
    const neighbor = getNeighbor(node);
    updateDis(neighbor, node); 
  }
  console.log("traversed");
} */
//***********************************************************************************************************//
class Test extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }

  /*  handleMouseOut(e) {
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
  */
  handleMouseDown(e) {
    console.log("down");
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
      if (x !== null) {
        x.classList.add("wall");
        x.isWall = true;
      }
      //  console.log(x.isWall, x.id);
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
      //      Color();
    } else if (stop_change) {
      let i_d = e.target.id;
      let m = i_d.match(/(\d+)/g);
      stop_row = parseInt(m[0], 10);
      stop_col = parseInt(m[1], 10);
      //  console.log(stop_row, stop_col);
      stop_change = false;
      //      Color();
    } else {
      let x = document.getElementById(e.target.id);
      if (
        e.target.id !== `grid-${start_row}-${start_col}` &&
        e.target.id !== `grid-${stop_row}-${stop_col}`
      ) {
        if (x !== null) {
          x.classList.add("wall");
          x.isWall = true;
        }
        //    console.log(x.isWall, x.id);
        wall_maker = false;
      }
    }
  }

  componentDidMount() {
    //    Color();
    const grid = gridMaker();
    this.setState({ grid });
    //    this.handleMouseOver();
    //  current_node = document.getElementById(`grid-${stop_row}-${stop_col}`);
  }

  ///////////////////

  /*****************************************/
  shortestPath() {
    let x = new GridBlock(
      `grid-${100}-${100}`,
      "grid-block",
      false,
      null,
      false,
      Infinity
    );
    console.log(Object.isExtensible(x));
    /*  start = document.getElementById(`grid-${start_row}-${start_col}`);
    //  console.log(start.id);
    start.distance = 0;
    traverseGrid();
    let shortestpath = [];
    let current_node = document.getElementById(`grid-${start_row}-${stop_col}`);  */
    // console.log(VisitedInOrder.length);
    // console.log(current_node.prev_value.id);
    /*
    while (current_node !== null) {
      shortestpath.unshift(current_node);
      current_node = current_node.prev_value;
    }
    for (let i = 0; i < shortestpath.length(); i++) {
      let x = shortestpath[i];
      x.classList.add("node-shortest-path");
    }
    */
  }
  /*************************************/

  render() {
    const { grid } = this.state;
    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    // mouseIsPressed={mouseIsPressed}
                    onMouseDown={this.handleMouseDown}
                    /*  onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      } */
                    //  onMouseUp={() => this.handleMouseUp()}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Test;
