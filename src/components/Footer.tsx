import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Footer: FC = () => {
  return (
    <footer>
      <Box sx={{ bgcolor: "#1976d2" }}>
        <Typography
          component="p"
          sx={{ color: "#ffffff", textAlign: "center" }}
        >
          &copy; 2023 maru
        </Typography>
      </Box>
    </footer>
  );
};
