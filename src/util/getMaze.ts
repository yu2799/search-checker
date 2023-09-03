type Props = (
  height: number,
  width: number,
  searchType: string
) => Promise<{ maze: number[][]; dist: number[][]; seq: number[][] }>;

export const getMaze: Props = async (height, width, searchType) => {
  const data = await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ height, width, searchType }),
  });
  const { maze, dist, seq } = await data.json();
  return { maze, dist, seq };
};
