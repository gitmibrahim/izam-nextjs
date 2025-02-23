"use client";

import React from "react";
import { Box, Typography, Switch } from "@mui/material";

interface JobHeaderProps {
  title: string;
  jobCount: number;
  onAlertToggle?: (enabled: boolean) => void;
}

export const JobHeader = ({
  title,
  jobCount,
  onAlertToggle,
}: JobHeaderProps) => {
  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginInlineStart: {
            xs: 2,
            sm: 3,
          },
          paddingInline: {
            xs: 2,
            md: 3,
          },
          paddingBlock: {
            xs: 1,
            md: 3
          },
          bgcolor: "success.main",
          color: "white",
          borderRadius: "5px"
        }}
      >
        <Box
          sx={{ 
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "start",
            gap: 2,
            bgcolor: "success.main",
            color: "white",
            flex: 1
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {jobCount} job positions
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignSelf: {
              xs: "flex-end",
              md: "center",
            },
          }}
        >
          <Typography variant="body2" sx={{ color: "white" }}>
            Set alert
          </Typography>
          <Switch
            onChange={(e) => onAlertToggle?.(e.target.checked)}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "white",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "white",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};
