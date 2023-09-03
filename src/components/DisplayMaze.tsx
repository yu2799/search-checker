import { FC, memo } from "react";
import * as d3 from "d3";

type Props = {
  maze: number[][];
  dist: number[][];
  visited: Set<string>;
  handleClick: (x: number, y: number) => void;
};

export const DisplayMaze: FC<Props> = memo(
  ({ maze, dist, visited, handleClick }): JSX.Element => {
    const height: number = maze.length;
    const width: number = maze[0].length;
    const rectSize: number = 20;

    const far: number = Math.max(...dist.map((i) => Math.max(...i)));
    const colorScale = d3
      .scaleLinear()
      .domain([0, far])
      .range(["white", "red"]);

    return (
      <svg
        height={height * rectSize}
        width={width * rectSize}
        viewBox={`0, 0, ${width * rectSize}, ${height * rectSize}`}
        style={{
          backgroundColor: "whitesmoke",
          verticalAlign: "bottom",
        }}
      >
        {maze.map((col, i) =>
          col.map((row, j) => (
            <rect
              x={j * rectSize}
              y={i * rectSize}
              height={rectSize}
              width={rectSize}
              fill={
                row
                  ? "black"
                  : visited.has(JSON.stringify([j, i]))
                  ? colorScale(dist[i][j])
                  : "gold"
              }
              stroke="black"
              strokeOpacity={0.25}
              key={i * width + j}
              onClick={() => handleClick(j, i)}
            ></rect>
          ))
        )}
      </svg>
    );
  }
);
