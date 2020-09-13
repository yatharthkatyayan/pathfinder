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
  for (let i = 0; i < grid_row; i++) {
    const row = [];
    for (let j = 0; j < grid_col; j++) {
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

function gridChanged(grid, row, col) {
  const newgrid = grid.slice();
  if (start_change) {
    let node = newgrid[start_row][start_col];
    node.isStart = false;
    start_col = col;
    start_row = row;
    node = newgrid[row][col];
    node.isStart = true;
  } else if (stop_change) {
    let node = newgrid[stop_row][stop_col];
    node.isFinish = false;
    stop_col = col;
    stop_row = row;
    node = newgrid[row][col];
    node.isFinish = true;
  } else {
    let node = newgrid[row][col];
    node.isWall = !node.isWall;
  }
  return newgrid;
}

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
*/
  handleMouseOver(row, col) {
    if (start_change || stop_change || wall_maker) {
      const newgrid = gridChanged(this.state.grid, row, col);
      this.setState({ grid: newgrid });
      console.log("renedred");
    }
  }

  handleMouseDown(row, col) {
    console.log("down");
    if (row == start_row && col == start_col) {
      start_change = true;
    } else if (row == stop_row && col == stop_col) {
      stop_change = true;
    } else {
      wall_maker = true;
      const newgrid = gridChanged(this.state.grid, row, col);
      this.setState({ grid: newgrid });
      console.log(this.state.grid[row][col].isWall);
    }
    console.log(row, col);
  }

  handleMouseUp(row, col) {
    console.log("up");
    if (start_change) {
      start_change = false;
    } else if (stop_change) {
      stop_change = false;
    } else {
      wall_maker = false;
    }
    console.log(start_row, start_col);
  }

  componentDidMount() {
    //    Color();
    const grid = gridMaker();
    this.setState({ grid });
    //  this.handleMouseOver();
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
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    /*  onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      } */
                    onMouseOver={(row, col) => this.handleMouseOver(row, col)}
                    onMouseUp={(row, col) => this.handleMouseUp(row, col)}
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
