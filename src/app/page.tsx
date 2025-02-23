"use client";

import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";
import NavBuilder from "./components/nav-builder/NavBuilder";
import { JobList } from "./components/jobs/JobList";
import { Box } from "@mui/material";
import { JobHeader } from "./components/jobs/JobHeader";
import { useState } from "react";
import { MOCK_JOBS } from "./services/data";
import { JobSorting } from "./components/jobs/JobSorting";

export default function Home() {
  const [, setSortBy] = useState("top_match");

  const handleSortChange = (value: string) => {
    setSortBy(value);
    // In a real app, we would sort the jobs here
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        component="main"
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: {
            xs: "column",
            md: "row",
          },
          paddingTop: {
            xs: 2,
            md: 0
          }
        }}
      >
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            minWidth: "436px"
          }}
        >
          <NavBuilder />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingTop: 2
          }}
        >
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignSelf: "flex-end"
            }}
          >
            <JobSorting
              onSortChange={handleSortChange}
            />
          </Box>
          
          <Box
            sx={{
              display: {
                xs: "flex",
                md: "block",
              },
              gap: 1,
              alignItems: "stretch",
              width: "calc(100% - 16px)",
            }}
          >
            <JobHeader
              title="UI Designers in Egypt"
              jobCount={MOCK_JOBS.length}
            />
            <Box
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
                alignItems: "center",
                flexBasis: "80px"
              }}
            >
              <NavBuilder />
            </Box>
          </Box>

          <JobList />
        </Box>
      </Box>
    </DndProvider>
  );
}
