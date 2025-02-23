"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Badge,
  Avatar,
  useTheme,
  useMediaQuery,
  SvgIcon,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import { SideMenu } from "./SideMenu";

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#000000",
          boxShadow: "none",
          height: "72px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: {
            xs: "0 16px",
            sm: "0 24px",
            md: "0 32px",
          },
          zIndex: 1100,
        }}
      >
        {isMobile ? (
          <>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                }}
                src="/assets/icons/profile-avatar.png"
                alt="User Avatar"
              />
              <IconButton
                onClick={handleMenuToggle}
                sx={{
                  position: 'absolute',
                  bottom: -8,
                  right: -8,
                  color: "#000",
                  padding: "4px",
                  bgcolor: "#fff",
                  "&:hover": {
                    color: "#fff",
                    bgcolor: "success.dark",
                  },
                }}
                size="small"
              >
                <MenuIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src="/assets/logo.svg"
                alt="iZAM Logo"
                width={80}
                height={32}
              />
            </Link>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                src="/assets/logo.svg"
                alt="iZAM Logo"
                width={100}
                height={40}
                style={{ marginRight: "16px" }}
              />
            </Link>
            <Box sx={{ flex: 1, maxWidth: "600px", margin: "0 24px" }}>
              <TextField
                fullWidth
                placeholder="Search by name, job title, ..."
                variant="outlined"
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            display: "grid",
                            placeItems: "center",
                            p: "7px 11px",
                            borderRadius: "50%",
                            bgcolor: "success.main"
                          }}
                        >
                          <SvgIcon
                            sx={{
                              fill: "#fff",
                              strokeWidth: 2
                            }}
                          >
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                          </SvgIcon>
                        </Box>
                      </InputAdornment>
                    ),
                    sx: {
                      paddingBlock: 3,
                      paddingInline: 2,
                      backgroundColor: "#FFFFFF",
                      borderRadius: "24px",
                      "& fieldset": {
                        border: "none",
                      },
                      height: "40px",
                    },
                  },
                }}
              />
            </Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ marginLeft: "auto" }}>
              <Link href="/" style={{ textDecoration: "none", color: "#FFFFFF" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: 1,
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <Image
                    src="/assets/icons/home-icon.svg"
                    alt="Home"
                    width={24}
                    height={24}
                  />
                  <Box
                    sx={{
                      fontSize: "12px",
                      mt: 0.5,
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    Home
                  </Box>
                </Box>
              </Link>
  
              <Link href="/jobs" style={{ textDecoration: "none", color: "#FFFFFF" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: 0.6,
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <Image
                    src="/assets/icons/jobs-icon.svg"
                    alt="Jobs"
                    width={24}
                    height={24}
                  />
                  <Box
                    sx={{
                      fontSize: "12px",
                      mt: 0.5,
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    Jobs
                  </Box>
                </Box>
              </Link>
  
              <Link
                href="/employers"
                style={{ textDecoration: "none", color: "#FFFFFF" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: 0.6,
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <Image
                    src="/assets/icons/employers-icon.svg"
                    alt="Employers"
                    width={24}
                    height={24}
                  />
                  <Box
                    sx={{
                      fontSize: "12px",
                      mt: 0.5,
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    Employers
                  </Box>
                </Box>
              </Link>
  
              <Box
                sx={{
                  borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
                  height: "40px",
                }}
              />
  
              <IconButton size="small">
                <Badge badgeContent={990} color="error">
                  <Image
                    src="/assets/icons/notifications-icon.svg"
                    alt="Notifications"
                    width={24}
                    height={24}
                  />
                </Badge>
              </IconButton>
  
              <IconButton size="small">
                <Badge badgeContent={9} color="error">
                  <Image
                    src="/assets/icons/message-icon.svg"
                    alt="Messages"
                    width={24}
                    height={24}
                  />
                </Badge>
              </IconButton>
  
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                }}
                src="/assets/icons/profile-avatar.png"
                alt="User Avatar"
              />
            </Stack>
          </>
        )}
      </AppBar>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
