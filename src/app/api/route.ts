import { NextRequest, NextResponse } from "next/server";
import { bfs } from "./bfs";
import { dfs } from "./dfs";

type RequestType = {
  height: number;
  width: number;
  searchType: string;
};

export async function POST(req: NextRequest) {
  const pram: RequestType = await req.json();
  const { height, width, searchType } = pram;
  const maze: number[][] = generateMaze(height, width);
  const { dist, seq } =
    searchType === "bfs" ? bfs(maze, height, width) : dfs(maze, height, width);
  return NextResponse.json({
    maze,
    dist,
    seq,
  });
}

type generateMazeProps = (height: number, width: number) => number[][];
const generateMaze: generateMazeProps = (height = 5, width = 5) => {
  let res: number[][] = generate2DArray(height, width, 1);
  res[1][1] = 0;
  const dir: number[][] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const q: number[][] = [[1, 1]];
  const wall = new Set<string>();
  for (let i = 1; i < height - 1; ++i) {
    for (let j = 1; j < width - 1; ++j) {
      wall.add(JSON.stringify([j, i]));
    }
  }

  while (q[0]) {
    const target = q.shift();
    if (!target) continue;
    let [curX, curY] = target;
    wall.delete(JSON.stringify([curX, curY]));

    while (true) {
      const tmp: number[][] = [];
      for (const [dx, dy] of dir) {
        // 場外判定
        if (!(1 <= curX + dx * 2 && curX + dx * 2 <= width - 1)) continue;
        if (!(1 <= curY + dy * 2 && curY + dy * 2 <= height - 1)) continue;

        // 壁判定
        if (!(res[curY + dy][curX + dx] && res[curY + dy * 2][curX + dx * 2]))
          continue;

        tmp.push([dx, dy]);
      }

      if (tmp[0]) {
        const [dx, dy] = tmp[Math.floor(Math.random() * tmp.length)];
        res[curY + dy][curX + dx] = 0;
        res[curY + dy * 2][curX + dx * 2] = 0;
        wall.delete(JSON.stringify([curX + dx, curY + dy]));
        wall.delete(JSON.stringify([curX + dx * 2, curY + dy * 2]));
        q.push([curX + dx * 2, curY + dy * 2]);
        curX += dx * 2;
        curY += dy * 2;
      } else break;
    }
  }

  // ループ作成
  const tar: number[][] = Array.from(wall).map((buf) => JSON.parse(buf));
  const cnt: number = tar.length;
  for (let i = 0; i < cnt / 3; ++i) {
    const idx: number = Math.floor(Math.random() * cnt);
    const [x, y] = tar[idx];
    res[y][x] = 0;
  }

  return res;
};

const generate2DArray = (m: number, n: number, val: number) => {
  return Array.from(new Array(m), (_) => new Array(n).fill(val));
};
