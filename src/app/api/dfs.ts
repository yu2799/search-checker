import { bfs } from "./bfs";

type dfsProps = (
  grid: number[][],
  height: number,
  width: number
) => { dist: number[][]; seq: number[][] };

export const dfs: dfsProps = (grid, height, width) => {
  const dir = [
    [0, -1],
    [1, 0],
    [-1, 0],
    [0, 1],
  ];
  let { dist } = bfs(grid, height, width);
  const visited = new Set<string>();
  const q = [[1, 1]];
  const seq = [];

  while (q[0]) {
    const target = q.pop();
    if (!target) continue;
    let [curX, curY] = target;
    visited.add(JSON.stringify(target));
    seq.push(target);
    for (const [dx, dy] of dir) {
      const nextX = curX + dx;
      const nextY = curY + dy;

      // 壁、到達判定
      if (grid[nextY][nextX] || visited.has(JSON.stringify([nextX, nextY])))
        continue;
      q.push([nextX, nextY]);
    }
  }
  return { dist, seq };
};

const generate2DArray = (m: number, n: number, val: number) => {
  return Array.from(new Array(m), (_) => new Array(n).fill(val));
};
