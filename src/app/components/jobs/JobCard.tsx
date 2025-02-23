"use client";

import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import { JobBadge } from "./JobBadge";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  postedDate: string;
  experience: string;
  type: string;
  workMode: string;
  categories: string[];
  companyLogo: string;
}

export const JobCard = ({
  title,
  company,
  location,
  postedDate,
  experience,
  type,
  workMode,
  categories,
  companyLogo,
}: JobCardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        p: 2,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Image
            src={companyLogo}
            alt={company}
            width={48}
            height={48}
            style={{ borderRadius: "8px" }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
              {company}
            </Typography>
          </Box>
        </Box>
        <IconButton
          size="small"
          sx={{
            color: "#666",
            "&:hover": {
              color: "#000",
            },
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
          </svg>
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#666">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <Typography variant="body2" sx={{ color: "#666" }}>
            {location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#666">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
          </svg>
          <Typography variant="body2" sx={{ color: "#666" }}>
            {postedDate}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <JobBadge label={experience} />
        <JobBadge label={type} />
        <JobBadge label={workMode} />
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {categories.map((category) => (
          <Typography
            key={category}
            variant="body2"
            sx={{
              color: "#666",
              "&:not(:last-child):after": {
                content: '"•"',
                marginLeft: 1,
                marginRight: 1,
              },
            }}
          >
            {category}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
