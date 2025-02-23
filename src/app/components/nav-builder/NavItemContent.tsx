import {
  ListItemText,
  IconButton,
  Stack,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { NavItem } from "./types";

interface NavItemContentProps {
  item: NavItem;
  isEditMode: boolean;
  isExpanded: boolean;
  isEditing: boolean;
  onToggleExpand: () => void;
  onEditClick: () => void;
  onEditComplete: () => void;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
  toggleVisibility: (id: number) => void;
}

export const NavItemContent = ({
  item,
  isEditMode,
  isExpanded,
  isEditing,
  onToggleExpand,
  onEditClick,
  onEditComplete,
  editedTitle,
  setEditedTitle,
  toggleVisibility,
}: NavItemContentProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onEditComplete();
    }
    if (event.key === "Escape") {
      setEditedTitle(item.title);
      onEditComplete();
    }
  };

  const getTextStyles = () => {
    const isMainItem = item.level === 0;

    return {
      fontSize: {
        xs: isMainItem ? "18px" : "16px",
        sm: isMainItem ? "20px" : "18px",
        md: isMainItem ? "24px" : "22px",
      },
      fontWeight: isMainItem ? 500 : 400,
      color: "#404040",
      lineHeight: {
        xs: isMainItem ? "24px" : "22px",
        sm: isMainItem ? "28px" : "24px",
        md: isMainItem ? "32px" : "30px",
      },
      letterSpacing: "0.15px",
    };
  };

  return (
    <>
      {isEditing ? (
        <TextField
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={onEditComplete}
          onKeyDown={handleKeyPress}
          size="small"
          autoFocus
          sx={{
            flex: 1,
            "& .MuiInputBase-root": {
              ...getTextStyles(),
            },
          }}
        />
      ) : (
        <ListItemText
          primary={item.title}
          sx={{
            "& .MuiTypography-root": getTextStyles(),
          }}
        />
      )}
      <Stack direction="row" spacing={1}>
        {isEditMode && (
          <>
            <IconButton size="small" onClick={onEditClick} disabled={isEditing}>
              <EditIcon sx={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => toggleVisibility(item.id)}
              disabled={isEditing}
            >
              {item.visible === false ? (
                <VisibilityOffIcon
                  sx={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }}
                />
              ) : (
                <VisibilityIcon
                  sx={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }}
                />
              )}
            </IconButton>
          </>
        )}
        {item.children && item.children.length > 0 && (
          <IconButton
            onClick={onToggleExpand}
            size="small"
            disabled={isEditing}
          >
            {isExpanded ? (
              <ExpandLessIcon
                sx={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }}
              />
            ) : (
              <ExpandMoreIcon
                sx={{ fontSize: isMobile ? "1.25rem" : "1.5rem" }}
              />
            )}
          </IconButton>
        )}
      </Stack>
    </>
  );
};
