import React, { Component } from "react";
import "./App.css";
import Node from "./node.jsx";

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
    }
    grid.push(row);
  }
  return grid;
}

function GridBlock(r, c) {
  return {
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

///////////////////

function gridChanged(grid, row, col) {
  const newgrid = grid.slice();
  if (start_change) {
    if (row == stop_row && col == stop_col) {
    } else {
      let node = newgrid[start_row][start_col];
      node.isStart = false;
      start_col = col;
      start_row = row;
      node = newgrid[row][col];
      node.isStart = true;
    }
  } else if (stop_change) {
    if (row == start_row && col == start_col) {
    } else {
      let node = newgrid[stop_row][stop_col];
      node.isFinish = false;
      stop_col = col;
      stop_row = row;
      node = newgrid[row][col];
      node.isFinish = true;
    }
  } else {
    if (row == start_row && col == start_col) {
    } else if (row == stop_row && col == stop_col) {
    } else {
      let node = newgrid[row][col];
      node.isWall = !node.isWall;
    }
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
    const grid = gridMaker();
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;
    return (
      <div className="grid button">
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
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
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
