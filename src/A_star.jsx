import React, { Component } from "react";
import "./App.css";

function updateNeighbor(cur_node, grid, grid_row, grid_col) {
  let neighbor = getNeighbor(cur_node, grid, grid_row, grid_col);
  for (let node of neighbor) {
    node.distance = cur_node.distance + 1;
    node.prev_value = cur_node;
  }
}

function getNeighbor(node, grid, grid_row, grid_col) {
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

export function Astar(startnode, finishnode, grid, grid_row, grid_col) {
  let visitedInOrder = [];
  let unvisited_grid = [];
  startnode.distance = 0;
  for (let i = 0; i < grid_row; i++) {
    for (let j = 0; j < grid_col; j++) {
      unvisited_grid.push(grid[i][j]);
    }
  }

  while (!!unvisited_grid.length) {
    let cur_node;
    let min_heuristic = Infinity;
    let min_total_distance = Infinity;
    for (let i = 0; i < unvisited_grid.length; i++) {
      let temp_heuristic =
        Math.abs(unvisited_grid[i].row - finishnode.row) +
        Math.abs(unvisited_grid[i].col - finishnode.col);
      if (unvisited_grid[i].distance + temp_heuristic < min_total_distance) {
        min_total_distance = unvisited_grid[i].distance + temp_heuristic;
        cur_node = unvisited_grid[i];
      }
      if (unvisited_grid[i].distance + temp_heuristic == min_total_distance) {
        if (temp_heuristic < min_heuristic) {
          min_heuristic = temp_heuristic;
          cur_node = unvisited_grid[i];
        }
      }
    }
    let index = unvisited_grid.indexOf(cur_node);
    unvisited_grid.splice(index, 1);

    if (cur_node.isWall) continue;

    if (cur_node.distance == Infinity) {
      visitedInOrder.shift();
      break;
    }
    cur_node.isvisited = true;
    visitedInOrder.push(cur_node);
    if (cur_node == finishnode) {
      visitedInOrder.shift();
      visitedInOrder.pop();
      break;
    }

    updateNeighbor(cur_node, grid, grid_row, grid_col);
  }
  return visitedInOrder;
}
