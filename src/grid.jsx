import React, { Component } from "react";
import "./App.css";
import Node from "./node.jsx";
import Dijkstra, { dijkstra } from "./dijkstra";
let wall_maker = false;
let start_row = 10;
let stop_row = 10;
let start_col = 10;
let stop_col = 40;
let start_change = false;
let stop_change = false;
let unvisited_grid = [];
let grid_row = 25;
let grid_col = 60;
let start;

/*----------------------------------------------- GRID START----------------------------------------------------------------*/

function gridMaker() {
  const grid = [];
  for (let i = 0; i < grid_row; i++) {
    const row = [];
    for (let j = 0; j < grid_col; j++) {
      row.push(GridBlock(i, j));
      unvisited_grid.push(GridBlock(i, j));
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

/*--------------------------------------------------  GRID  END -------------------------------------------------------------*/

class Test extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }

  traverseDijkstra(startnode, finishnode, grid) {
    let visitedInOrder = dijkstra(startnode, finishnode, grid);

    const nodesInShortestPathOrder = [];
    let currentNode = finishnode;
    while (currentNode.prev_value !== null) {
      nodesInShortestPathOrder.push(currentNode);
      currentNode = currentNode.prev_value;
    }

    this.animatePath(visitedInOrder, nodesInShortestPathOrder);
  }

  animatePath(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`grid-${node.row}-${node.col}`).className =
          "grid-block grid-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`grid-${node.row}-${node.col}`).className =
          "grid-block grid-shortest-path";
      }, 50 * i);
    }
  }

  handleMouseOver(row, col) {
    if (start_change || stop_change || wall_maker) {
      const newgrid = gridChanged(this.state.grid, row, col);
      this.setState({ grid: newgrid });
    }
  }

  handleMouseDown(row, col) {
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
  }

  handleMouseUp(row, col) {
    if (start_change) {
      start_change = false;
    } else if (stop_change) {
      stop_change = false;
    } else {
      wall_maker = false;
    }
  }
  /*-----------------------------------------RENDERING START-----------------------------------------------------------------*/
  componentDidMount() {
    const grid = gridMaker();
    this.setState({ grid });
  }

  render() {
    const { grid } = this.state;
    return (
      <>
        <button
          onClick={() =>
            this.traverseDijkstra(
              grid[start_row][start_col],
              grid[stop_row][stop_col],
              grid
            )
          }
        >
          Dijkstra
        </button>

        <div className="grid button ">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="col">
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <div className="row">
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseOver={(row, col) =>
                          this.handleMouseOver(row, col)
                        }
                        onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                        row={row}
                      ></Node>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Test;
/*----------------------------------------------RENDERING -------------------------------------------------------------*/
