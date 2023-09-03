type bfsProps = (
  grid: number[][],
  height: number,
  width: number
) => { dist: number[][]; seq: number[][] };

export const bfs: bfsProps = (grid, height, width) => {
  const dir = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  let dist = generate2DArray(height, width, -1);
  dist[1][1] = 0;
  const q = [[1, 1]];
  const seq = [];

  while (q[0]) {
    const target = q.shift();
    if (!target) continue;
    let [curX, curY] = target;
    seq.push(target);
    for (const [dx, dy] of dir) {
      const nextX = curX + dx;
      const nextY = curY + dy;

      // 壁、到達判定
      if (grid[nextY][nextX] || dist[nextY][nextX] > -1) continue;
      dist[nextY][nextX] = dist[curY][curX] + 1;
      q.push([nextX, nextY]);
    }
  }
  return { dist, seq };
};

const generate2DArray = (m: number, n: number, val: number) => {
  return Array.from(new Array(m), (_) => new Array(n).fill(val));
};
