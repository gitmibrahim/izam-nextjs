import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface BurgerMenuProps {
  onClick: () => void;
}

export const BurgerMenu = ({ onClick }: BurgerMenuProps) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        border: 1,
        borderRadius: "4px",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: "#F5F5F5",
        },
        md: {
          display: "none",
        },
        width: "100%",
        height: "100%",
      }}
    >
      <MenuIcon sx={{ fontSize: "24px", color: "#404040" }} />
    </IconButton>
  );
};
