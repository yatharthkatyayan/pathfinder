import React, { Component } from "react";
import "./App.css";
import Node from "./node.jsx";
import Dijkstra, { dijkstra } from "./dijkstra";
import { Astar } from "./A_star";
import { swarm } from "./swarm";
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
let nav_height = 0;
let animation_working = false;
/* let dijkstra_variable;
let astar_variable;
let swarm_variable;
*/
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
  if (animation_working === false) {
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
        let y = document.getElementById(`grid-${node.row}-${node.col}`);
        y.classList.remove("grid-outline");
      }
    }
    return newgrid;
  }
}

/*--------------------------------------------------  GRID  END -------------------------------------------------------------*/

class Grid extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
    };
  }

  traverseDijkstra(startnode, finishnode, grid) {
    if (animation_working === false) {
      this.clearPath(this.state.grid);
      animation_working = true;
      this.linkdisabler(grid);
      let visitedInOrder = dijkstra(
        startnode,
        finishnode,
        grid,
        grid_row,
        grid_col
      );

      const nodesInShortestPathOrder = [];
      let currentNode = finishnode;
      while (currentNode.prev_value !== null) {
        nodesInShortestPathOrder.push(currentNode);
        currentNode = currentNode.prev_value;
      }
      nodesInShortestPathOrder.shift();
      this.animatePath(visitedInOrder, nodesInShortestPathOrder);
    }
  }
  traverseSwarm(startnode, finishnode, grid) {
    if (animation_working === false) {
      this.clearPath(this.state.grid);
      animation_working = true;
      this.linkdisabler(grid);
      let visitedInOrder = swarm(
        startnode,
        finishnode,
        grid,
        grid_row,
        grid_col
      );

      const nodesInShortestPathOrder = [];
      let currentNode = finishnode;
      while (currentNode.prev_value !== null) {
        nodesInShortestPathOrder.push(currentNode);
        currentNode = currentNode.prev_value;
      }
      nodesInShortestPathOrder.shift();
      this.animatePath(visitedInOrder, nodesInShortestPathOrder);
    }
  }

  traverse_Astar(startnode, finishnode, grid) {
    if (animation_working === false) {
      this.clearPath(this.state.grid);
      animation_working = true;
      this.linkdisabler(grid);
      let visitedInOrder = Astar(
        startnode,
        finishnode,
        grid,
        grid_row,
        grid_col
      );

      const nodesInShortestPathOrder = [];
      let currentNode = finishnode;
      while (currentNode.prev_value !== null) {
        nodesInShortestPathOrder.push(currentNode);
        currentNode = currentNode.prev_value;
      }
      nodesInShortestPathOrder.shift();
      this.animatePath(visitedInOrder, nodesInShortestPathOrder);
    }
  }

  animatePath(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        if (nodesInShortestPathOrder.length === 0) {
          animation_working = false;
          this.linkdisabler(this.state.grid);
        }
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
    animation_working = false;
    this.linkdisabler(this.state.grid);
  }

  clearBoard(grid) {
    if (animation_working === false) {
      const newgrid = grid.slice();
      for (let i = 0; i < grid_row; i++) {
        for (let j = 0; j < grid_col; j++) {
          let x = grid[i][j];
          let y = document.getElementById(`grid-${x.row}-${x.col}`);
          y.classList.remove("grid-shortest-path");
          y.classList.remove("grid-visited");
          y.classList.add("grid-outline");
          x.isWall = false;
          y.isWall = false;
          x.isvisited = false;
          x.prev_value = null;
          x.distance = Infinity;
        }
      }
      this.setState({ grid: newgrid });
    }
  }
  clearPath(grid) {
    if (animation_working === false) {
      const newgrid = grid.slice();
      for (let i = 0; i < grid_row; i++) {
        for (let j = 0; j < grid_col; j++) {
          let x = grid[i][j];
          let y = document.getElementById(`grid-${x.row}-${x.col}`);
          y.classList.remove("grid-shortest-path");
          y.classList.remove("grid-visited");
          y.classList.add("grid-outline");
          if (y.isWall || x.isWall) {
            y.classList.remove("grid-outline");
          }
          x.isvisited = false;
          x.prev_value = null;
          x.distance = Infinity;
        }
      }
      this.setState({ grid: newgrid });
    }
  }

  linkdisabler(grid) {
    let d_variable, a_variable, s_variable, clear_grid, clear_path;
    if (animation_working === false) {
      d_variable = "Dijkstra";
      a_variable = "Astar";
      s_variable = "Swarm";
      clear_grid = "clear grid";
      clear_path = "clear path";
    } else {
      d_variable = <s>Dijkstra</s>;
      a_variable = <s>Astar</s>;
      s_variable = <s>Swarm</s>;
      clear_grid = <s>clear grid</s>;
      clear_path = <s>clear path</s>;
    }

    this.setState({ dijkstra_variable: d_variable });
    this.setState({ astar_variable: a_variable });
    this.setState({ swarm_variable: s_variable });
    this.setState({ cleargrid: clear_grid });
    this.setState({ clearpath: clear_path });
  }

  handleMouseOver(row, col) {
    if (animation_working === false) {
      if (start_change || stop_change || wall_maker) {
        const newgrid = gridChanged(this.state.grid, row, col);
        this.setState({ grid: newgrid });
      }
    }
  }

  handleMouseDown(row, col) {
    if (animation_working === false) {
      this.clearPath(this.state.grid);
      if (row == start_row && col == start_col) {
        start_change = true;
      } else if (row == stop_row && col == stop_col) {
        stop_change = true;
      } else {
        wall_maker = true;
        const newgrid = gridChanged(this.state.grid, row, col);
        this.setState({ grid: newgrid });
      }
    }
  }

  handleMouseUp() {
    if (animation_working === false) {
      if (start_change) {
        start_change = false;
      } else if (stop_change) {
        stop_change = false;
      } else {
        wall_maker = false;
      }
    }
  }
  /*-----------------------------------------RENDERING START-----------------------------------------------------------------*/
  /*
  componentDidMount() {
    nav_height = document.getElementById("nav").clientHeight;
    grid_row = Math.floor((window.innerHeight - nav_height) / 25);
    grid_col = Math.floor(window.innerWidth / 25);
    start_col = 0;
    start_row = Math.floor(grid_row / 2);
    stop_col = grid_col - 1;
    stop_row = Math.floor(grid_row / 2);
    const grid = gridMaker();

    this.setState({ grid });
  }
*/

  updateDimensions() {
    let update_width = window.innerWidth;
    let update_height = window.innerHeight;

    nav_height = document.getElementById("nav").clientHeight;
    grid_row = Math.floor((update_height - nav_height) / 25);
    grid_col = Math.floor(update_width / 25);
    start_col = 0;
    start_row = Math.floor(grid_row / 2);
    stop_col = grid_col - 1;
    stop_row = Math.floor(grid_row / 2);
    const newgrid = gridMaker();
    this.setState({ grid: newgrid });
  }

  componentDidMount() {
    this.updateDimensions();
    this.linkdisabler(this.state.grid);

    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  /*----------------------------------------------------------------------------------------------*/

  render() {
    const {
      grid,
      dijkstra_variable,
      astar_variable,
      swarm_variable,
      cleargrid,
      clearpath,
    } = this.state;

    return (
      <div className="position">
        <div className="topnav" id="nav">
          <a
            href="#"
            onClick={() =>
              this.traverseDijkstra(
                grid[start_row][start_col],
                grid[stop_row][stop_col],
                grid,
                grid_row,
                grid_col
              )
            }
          >
            {dijkstra_variable}
          </a>
          <a
            href="#"
            onClick={() =>
              this.traverse_Astar(
                grid[start_row][start_col],
                grid[stop_row][stop_col],
                grid,
                grid_row,
                grid_col
              )
            }
          >
            {astar_variable}
          </a>
          <a
            href="#"
            onClick={() =>
              this.traverseSwarm(
                grid[start_row][start_col],
                grid[stop_row][stop_col],
                grid,
                grid_row,
                grid_col
              )
            }
          >
            {swarm_variable}
          </a>
          <a href="#" onClick={() => this.clearBoard(grid)}>
            {cleargrid}
          </a>
          <a href="#" onClick={() => this.clearPath(grid)}>
            {clearpath}
          </a>
        </div>

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
      </div>
    );
  }
}

export default Grid;
/*----------------------------------------------RENDERING -------------------------------------------------------------*/
