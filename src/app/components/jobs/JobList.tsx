"use client";

import React from "react";
import { Box } from "@mui/material";
import { JobCard } from "./JobCard";
import { MOCK_JOBS } from "@/app/services/data";

export const JobList = () => {
  return (
    <Box
      sx={{
        padding: {
          xs: 2,
          sm: 3,
        },
      }}
    >
      <Box>
        {MOCK_JOBS.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </Box>
    </Box>
  );
};
