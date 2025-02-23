import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@mui/material";
import { Header } from "./components/Header";
import ThemeRegistry from "./theme/ThemeRegistry";
export const metadata: Metadata = {
  title: "Nav Customizer",
  description:
    "A customizable navigation builder with drag and drop functionality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header />
            <Box
              sx={{
                flex: 1,
                marginTop: "72px",
                minHeight: "100vh",
                backgroundColor: "rgb(245, 245, 245)",
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
