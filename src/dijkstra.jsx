import React, { Component } from "react";
import "./App.css";

let grid_row = 20;
let grid_col = 50;

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

export function dijkstra(startnode, finishnode, grid) {
  let visitedInOrder = [];
  let unvisited_grid = [];
  startnode.distance = 0;
  for (let i = 0; i < grid_row; i++) {
    for (let j = 0; j < grid_col; j++) {
      unvisited_grid.push(grid[i][j]);
    }
  }

  while (!!unvisited_grid.length) {
    sortNodesByDistance(unvisited_grid);
    let cur_node = unvisited_grid.shift();
    if (cur_node.isWall) continue;

    if (cur_node.distance == Infinity) return visitedInOrder;
    cur_node.isvisited = true;
    visitedInOrder.push(cur_node);
    if (cur_node == finishnode) return visitedInOrder;
    updateNeighbor(cur_node, grid);
  }
  return visitedInOrder;
}
