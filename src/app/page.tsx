"use client";

import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  SyntheticEvent,
} from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import { getMaze } from "@/util/getMaze";
import { DisplayMaze } from "@/components/DisplayMaze";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const [maze, setMaze] = useState<number[][] | null>(null);
  const [dist, setDist] = useState<number[][] | null>(null);
  const [seq, setSeq] = useState<number[][] | null>(null);
  const [cnt, setCnt] = useState<number>(1);
  const [missCnt, setMissCnt] = useState<number>(0);
  const [height, setHeight] = useState<number>(11);
  const [width, setWidth] = useState<number>(17);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState([false, 0]);
  const [searchType, setSearchType] = useState("bfs");
  console.log(searchType);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen([false, 0]);
  };

  const mazeGenerate = () =>
    getMaze(height, width, searchType).then(({ maze, dist, seq }) => {
      setMaze(maze);
      setDist(dist);
      setSeq(seq);
      setCnt(0);
      setMissCnt(0);
      setVisited(new Set());
    });

  const handleClick = useCallback(
    (x: number, y: number): void => {
      if (!dist || !seq || dist[y][x] === -1) return;

      const visit: string = JSON.stringify([x, y]);
      if (JSON.stringify(seq[cnt]) === visit) {
        setCnt((prev) => prev + 1);
        visited.add(visit);
        setOpen([true, 1]);
      } else {
        setMissCnt((prev) => prev + 1);
        setOpen([true, 2]);
      }
    },
    [dist, cnt]
  );

  useEffect(() => {
    mazeGenerate();
  }, []);

  return (
    <div>
      {maze && dist && seq ? (
        <Container
          sx={{
            textAlign: "center",
            pt: 5,
            pb: 7,
          }}
        >
          <Stack direction="row">
            <DisplayMaze
              maze={maze}
              dist={dist}
              visited={visited}
              handleClick={handleClick}
            />
            <Paper
              elevation={3}
              sx={{
                flexGrow: 1,
                ml: 3,
                overflowY: "scroll",
                height: height * 20,
              }}
            >
              <List>
                {seq.map(([x, y], idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      display: visited.has(JSON.stringify([x, y]))
                        ? "none"
                        : "block",
                      pb: 0,
                    }}
                  >{`(x, y) = (${x}, ${y})`}</ListItem>
                ))}
              </List>
            </Paper>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ pt: 5 }}>
            <Typography
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              Miss Count: {missCnt}
            </Typography>
            <Select
              value={searchType}
              defaultValue="bfs"
              onChange={(e: SelectChangeEvent) =>
                setSearchType(e.target.value as string)
              }
            >
              <MenuItem value="bfs">幅優先探索</MenuItem>
              <MenuItem value="dfs">深さ優先探索</MenuItem>
            </Select>
            <Button variant="contained" onClick={mazeGenerate}>
              Regenerate
            </Button>
          </Stack>
          {open[1] !== 0 && (
            <Snackbar
              open={open[0] as boolean}
              autoHideDuration={900}
              onClose={handleClose}
            >
              <Alert
                severity={open[1] === 1 ? "success" : "error"}
                sx={{ width: "100%" }}
                onClose={handleClose}
              >
                {open[1] === 1 ? "正解！" : "違います..."}
              </Alert>
            </Snackbar>
          )}
        </Container>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
