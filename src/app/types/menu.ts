export interface MenuItem {
  id: number;
  title: string;
  visible: boolean;
  open?: boolean;
  children?: MenuItem[];
}

export interface DragItem {
  id: number;
  index: number;
  parentId: number | null;
}

export interface TrackDropPayload {
  id: number;
  from: number;
  to: number;
}
