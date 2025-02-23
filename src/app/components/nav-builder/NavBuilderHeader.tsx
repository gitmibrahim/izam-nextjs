import {
  Box,
  Typography,
  IconButton,
  Stack,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

interface NavBuilderHeaderProps {
  isEditMode: boolean;
  saving: boolean;
  onEditModeToggle: () => void;
  onSave: () => void;
  onDiscard: () => void;
  onMobileClose?: () => void;
}

export const NavBuilderHeader = ({
  isEditMode,
  saving,
  onEditModeToggle,
  onSave,
  onDiscard,
  onMobileClose,
}: NavBuilderHeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: {
          xs: "100%",
          sm: "100%",
          md: "436px",
        },
        height: {
          xs: "80px",
          sm: "90px",
          md: "98px",
        },
        mb: {
          xs: "16px",
          sm: "24px",
          md: "32px",
        },
        p: {
          xs: 1.5,
          sm: 2,
          md: 2,
        },
        boxSizing: "border-box",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        opacity: 1,
        backgroundColor: "background.paper",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {isMobile && onMobileClose && (
          <IconButton
            onClick={onMobileClose}
            sx={{
              p: 0.5,
              mr: 1,
            }}
          >
            <ArrowBackIcon
              sx={{
                fontSize: "24px",
                color: "#404040",
              }}
            />
          </IconButton>
        )}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          component="h1"
          sx={{
            fontSize: {
              xs: "18px",
              sm: "22px",
              md: "25px",
            },
            fontWeight: 500,
            color: "#404040",
            lineHeight: {
              xs: "24px",
              sm: "28px",
              md: "32px",
            },
            letterSpacing: {
              xs: "0.15px",
              sm: "0.15px",
              md: "0.25px",
            },
          }}
        >
          Menu
        </Typography>
      </Stack>
      {!isEditMode ? (
        <IconButton
          onClick={onEditModeToggle}
          size={isMobile ? "small" : "medium"}
          sx={{
            width: {
              xs: "24px",
              sm: "28px",
              md: "30px",
            },
            height: {
              xs: "24px",
              sm: "28px",
              md: "30px",
            },
            padding: 0,
            "& img": {
              width: "100%",
              height: "100%",
            },
          }}
        >
          <Image
            src="/assets/setting.svg"
            alt="Settings"
            width={30}
            height={30}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </IconButton>
      ) : (
        <Stack direction="row" spacing={isMobile ? 0.5 : 1}>
          <IconButton
            onClick={onDiscard}
            color="error"
            size={isMobile ? "small" : "medium"}
            disabled={saving}
            sx={{
              width: {
                xs: "32px",
                sm: "36px",
                md: "40px",
              },
              height: {
                xs: "32px",
                sm: "36px",
                md: "40px",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }} />
          </IconButton>
          <IconButton
            onClick={onSave}
            color="success"
            size={isMobile ? "small" : "medium"}
            disabled={saving}
            sx={{
              width: {
                xs: "32px",
                sm: "36px",
                md: "40px",
              },
              height: {
                xs: "32px",
                sm: "36px",
                md: "40px",
              },
            }}
          >
            {saving ? (
              <CircularProgress size={isMobile ? 16 : 20} color="inherit" />
            ) : (
              <CheckIcon sx={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }} />
            )}
          </IconButton>
        </Stack>
      )}
    </Box>
  );
};
