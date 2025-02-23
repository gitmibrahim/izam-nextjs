"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface JobBadgeProps {
  label: string;
}

export const JobBadge = ({ label }: JobBadgeProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        borderRadius: "4px",
        px: 1.5,
        py: 0.5,
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "#666",
          fontSize: "12px",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
