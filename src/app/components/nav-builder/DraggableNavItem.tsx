import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import { ListItem, List } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { NavItem, DragItem } from "./types";
import { NavItemContent } from "./NavItemContent";

interface DraggableNavItemProps {
  item: NavItem;
  index: number;
  moveItem: (
    dragIndex: number,
    hoverIndex: number,
    level: number,
    parentId?: number
  ) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  level: number;
  isEditMode: boolean;
  onTrackMovement: (id: number, from: number, to: number) => void;
  parentId?: number;
  toggleVisibility: (id: number) => void;
}

export const DraggableNavItem = ({
  item,
  index,
  moveItem,
  isExpanded,
  onToggleExpand,
  level,
  isEditMode,
  onTrackMovement,
  parentId,
  toggleVisibility,
}: DraggableNavItemProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const originalIndex = useRef(index);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
    item.title = editedTitle;
  };

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: `NAV_ITEM_LEVEL_${level}${parentId ? `_PARENT_${parentId}` : ""}`,
    item: () => {
      originalIndex.current = index;
      return { index, level, id: item.id, parentId };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isEditMode && !isEditing,
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        if (item.index !== index) {
          onTrackMovement(item.id, originalIndex.current, index);
        }
      }
    },
  });

  const [, drop] = useDrop({
    accept: `NAV_ITEM_LEVEL_${level}${parentId ? `_PARENT_${parentId}` : ""}`,
    hover: (draggedItem: DragItem, monitor) => {
      if (!ref.current || !isEditMode || isEditing) {
        return;
      }

      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }

      moveItem(dragIndex, hoverIndex, level, parentId);
      draggedItem.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <>
      <ListItem
        ref={ref}
        component="li"
        sx={{
          opacity: isDragging ? 0.5 : item.visible === false ? 0.5 : 1,
          cursor: isEditMode && !isEditing ? "move" : "default",
          bgcolor: level === 0 ? "rgba(0, 0, 0, 0.04)" : "transparent",
          "&:hover": {
            bgcolor: level === 0 ? "rgba(0, 0, 0, 0.08)" : "transparent",
          },
          mb: {
            xs: "10px",
            sm: "12px",
            md: "14px",
          },
          borderRadius: 1,
          pl: level * 2 + 2,
        }}
      >
        {isEditMode && (
          <DragIndicatorIcon sx={{ mr: 2, color: "text.secondary" }} />
        )}
        <NavItemContent
          item={item}
          isEditMode={isEditMode}
          isExpanded={isExpanded}
          isEditing={isEditing}
          onToggleExpand={onToggleExpand}
          onEditClick={handleEditClick}
          onEditComplete={handleEditComplete}
          editedTitle={editedTitle}
          setEditedTitle={setEditedTitle}
          toggleVisibility={toggleVisibility}
        />
      </ListItem>
      {item.children && isExpanded && (
        <List sx={{ mb: 1 }}>
          {(isEditMode
            ? item.children
            : item.children.filter((child) => child.visible !== false)
          ).map((child, childIndex) => (
            <DraggableNavItem
              key={child.id}
              index={childIndex}
              item={child}
              moveItem={moveItem}
              isExpanded={false}
              onToggleExpand={() => {}}
              level={level + 1}
              isEditMode={isEditMode}
              onTrackMovement={onTrackMovement}
              parentId={item.id}
              toggleVisibility={toggleVisibility}
            />
          ))}
        </List>
      )}
    </>
  );
};
