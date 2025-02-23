import { type ApiNavItem } from "../../services/api";

export interface NavItem extends Omit<ApiNavItem, "children"> {
  level: number;
  children?: NavItem[];
}

export interface DragItem {
  index: number;
  level: number;
  id: number;
  parentId?: number;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}
