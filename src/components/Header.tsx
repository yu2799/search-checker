"use client";

import { FC, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" sx={{ flexGrow: 1 }}>
          search checker
        </Typography>
        <IconButton size="large" onClick={handleOpen} color="inherit">
          <HelpOutlineIcon />
        </IconButton>
      </Toolbar>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle>つかいかた</DialogTitle>
        <DialogContent>
          <Typography component="p">
            幅優先探索と深さ優先探索が選べます。
          </Typography>
          <Typography component="p">
            候補が複数あるときは右/下/左/上の順で探索するものとしています。
          </Typography>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
};
