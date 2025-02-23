import { useState, useRef, useEffect } from "react";
import {
  Box,
  List,
  CircularProgress,
  Snackbar,
  Alert,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { navService, type ApiNavItem } from "../../services/api";
import { NavItem, SnackbarState } from "./types";
import { NavBuilderHeader } from "./NavBuilderHeader";
import { DraggableNavItem } from "./DraggableNavItem";
import { BurgerMenu } from "./BurgerMenu";

const NavBuilder = () => {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });
  const isInitialFetch = useRef(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isInitialFetch.current) {
      fetchNavItems();
      isInitialFetch.current = false;
    }
  }, []);

  const fetchNavItems = async () => {
    try {
      const data = await navService.getNavItems();
      const processItems = (items: ApiNavItem[], level: number): NavItem[] => {
        return items.map((item) => ({
          ...item,
          level,
          children: item.children
            ? processItems(item.children, level + 1)
            : undefined,
        }));
      };
      setItems(processItems(data, 0));
    } catch (error) {
      console.error("Error fetching nav items:", error);
      setSnackbar({
        open: true,
        message: "Failed to load navigation items",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const moveItem = (
    dragIndex: number,
    hoverIndex: number,
    level: number,
    parentId?: number
  ) => {
    const newItems = [...items];

    if (level === 0) {
      const [draggedItem] = newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, draggedItem);
    } else {
      const findParentItem = (
        items: NavItem[],
        targetParentId: number
      ): NavItem | null => {
        for (const item of items) {
          if (item.id === targetParentId) return item;
          if (item.children) {
            const found = findParentItem(
              item.children.map((child) => ({
                ...child,
                level: item.level + 1,
              })),
              targetParentId
            );
            if (found) return found;
          }
        }
        return null;
      };

      const parentItem = parentId ? findParentItem(newItems, parentId) : null;
      if (parentItem && parentItem.children) {
        const [draggedItem] = parentItem.children.splice(dragIndex, 1);
        parentItem.children.splice(hoverIndex, 0, draggedItem);
      }
    }

    setItems(newItems);
  };

  const trackMovement = async (id: number, from: number, to: number) => {
    try {
      await navService.trackMovement({ id, from, to });
    } catch (error) {
      console.error("Error tracking movement:", error);
    }
  };

  const toggleExpand = (itemId: number) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleVisibility = (itemId: number) => {
    setItems((prevItems) => {
      const updateItemVisibility = (items: NavItem[]): NavItem[] => {
        return items.map((item) => {
          if (item.id === itemId) {
            return { ...item, visible: item.visible === false ? true : false };
          }
          if (item.children) {
            return {
              ...item,
              children: updateItemVisibility(
                item.children.map((child) => ({
                  ...child,
                  level: item.level + 1,
                }))
              ),
            };
          }
          return item;
        });
      };
      return updateItemVisibility(prevItems);
    });
  };

  const handleSave = async () => {
    setSaving(true);
    const maxRetries = 3;
    let currentTry = 0;

    while (currentTry < maxRetries) {
      try {
        const cleanItems = (items: NavItem[]): ApiNavItem[] => {
          return items.map((item) => {
            const { level, ...cleanItem } = item;
            return {
              ...cleanItem,
              children: item.children
                ? cleanItems(
                    item.children.map((child) => ({
                      ...child,
                      level: level + 1,
                    }))
                  )
                : undefined,
            };
          });
        };

        await navService.saveNavItems(cleanItems(items));

        setSnackbar({
          open: true,
          message: "Changes saved successfully",
          severity: "success",
        });
        setIsEditMode(false);
        break;
      } catch (error) {
        currentTry++;
        console.error(
          `Error saving nav items (attempt ${currentTry}/${maxRetries}):`,
          error
        );

        if (currentTry === maxRetries) {
          setSnackbar({
            open: true,
            message: `Failed to save changes after ${maxRetries} attempts`,
            severity: "error",
          });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
    setSaving(false);
  };

  const handleDiscard = () => {
    fetchNavItems();
    setIsEditMode(false);
    setSnackbar({
      open: true,
      message: "Changes discarded",
      severity: "success",
    });
  };

  const NavContent = () => (
    <>
      <NavBuilderHeader
        isEditMode={isEditMode}
        saving={saving}
        onEditModeToggle={() => setIsEditMode(!isEditMode)}
        onSave={handleSave}
        onDiscard={handleDiscard}
        onMobileClose={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
      />
      <List
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
            md: 2,
          },
          boxSizing: "border-box",
          flex: 1,
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {(isEditMode
          ? items
          : items.filter((item) => item.visible !== false)
        ).map((item, index) => (
          <DraggableNavItem
            key={item.id}
            index={index}
            item={item}
            moveItem={moveItem}
            isExpanded={expandedItems.includes(item.id)}
            onToggleExpand={() => toggleExpand(item.id)}
            level={0}
            isEditMode={isEditMode}
            onTrackMovement={trackMovement}
            toggleVisibility={toggleVisibility}
          />
        ))}
      </List>
    </>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {isMobile ? (
        <>
          <BurgerMenu onClick={() => setIsMobileMenuOpen(true)} />
          <Drawer
            anchor="left"
            open={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: "100%",
                height: "100%",
                backgroundColor: "#FFFFFF",
                zIndex: 1200,
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <NavContent />
            </Box>
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            top: 72,
            bottom: 0,
            width: {
              xs: "100%",
              md: "436px",
            },
            height: "100vh",
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
            zIndex: 1200,
          }}
        >
          <NavContent />
        </Box>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NavBuilder;
