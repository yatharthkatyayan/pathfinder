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

/***************************************************************************************************** */
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbor(cur_node, grid) {
  let neighbor = getNeighbor(cur_node, grid);
  for (let node of neighbor) {
    node.distance = cur_node.distance + 1;
    node.prev_value = cur_node;
  }
}

function getNeighbor(node, grid) {
  let neighbor = [];
  let r = node.row;
  let c = node.col;
  if (r + 1 < grid_row) {
    neighbor.push(grid[r + 1][c]);
  }
  if (c + 1 < grid_col) {
    neighbor.push(grid[r][c + 1]);
  }
  if (r - 1 >= 0) {
    neighbor.push(grid[r - 1][c]);
  }
  if (c - 1 >= 0) {
    neighbor.push(grid[r][c - 1]);
  }
  return neighbor.filter((neighbor) => !neighbor.isvisited);
}

function shortestPath(startnode, finishnode, grid) {
  let visitedInOrder = [];
  startnode.distance = 0;
  for (let i = 0; i < grid_row; i++) {
    for (let j = 0; j < grid_col; j++) {
      unvisited_grid.push(grid[i][j]);
    }
  }

  /* for (let i = 0; i < unvisited_grid.length; i++) {
    console.log(unvisited_grid[i]);
  } */
  while (!!unvisited_grid.length) {
    sortNodesByDistance(unvisited_grid);
    let cur_node = unvisited_grid.shift();
    if (cur_node.isWall) continue;
    // console.log(cur_node.distance);
    if (cur_node.distance == Infinity) return visitedInOrder;
    cur_node.isvisited = true;
    visitedInOrder.push(cur_node);
    if (cur_node == finishnode) return visitedInOrder;
    updateNeighbor(cur_node, grid);
  }
  return visitedInOrder;
}

//***********************************************************************************************************//
class Test extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }

  traverse(startnode, finishnode, grid) {
    let visitedInOrder = shortestPath(startnode, finishnode, grid);

    const nodesInShortestPathOrder = [];
    let currentNode = finishnode;
    while (currentNode.prev_value !== null) {
      nodesInShortestPathOrder.push(currentNode);
      currentNode = currentNode.prev_value;
    }
    /*  for (let i = 0; i < visitedInOrder.length; i++) {
      let x = visitedInOrder[i];
      document
        .getElementById(`grid-${x.row}-${x.col}`)
        .classList.add("grid-visited");
    }
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      let x = nodesInShortestPathOrder[i];
      document
        .getElementById(`grid-${x.row}-${x.col}`)
        .classList.add("grid-shortest-path");
    } */
    this.animateDijkstra(visitedInOrder, nodesInShortestPathOrder);
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
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
    console.log(start_row, start_col);
  }

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
            this.traverse(
              grid[start_row][start_col],
              grid[stop_row][stop_col],
              grid
            )
          }
        >
          algo
        </button>

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
      </>
    );
  }
}

export default Test;
