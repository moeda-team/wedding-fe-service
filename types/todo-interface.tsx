// Priority values mirror the backend `TodoPriority` enum exactly so the same
// value round-trips to the API without translation.
export type TodoPriority = "LOW" | "MEDIUM" | "HIGH";

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  priority: TodoPriority;
  done: boolean;
}

export interface TodoGroup {
  id: string;
  name: string;
  items: TodoItem[];
}

export interface PriorityMeta {
  /** Bahasa Indonesia label shown to the user. */
  label: string;
  /** Small dot color used in the priority dropdown. */
  dot: string;
  /** Solid pill styling used on the item badge. */
  badge: string;
}

export const PRIORITY_META: Record<TodoPriority, PriorityMeta> = {
  LOW: {
    label: "Prioritas Rendah",
    dot: "bg-[#3bb273]",
    badge: "bg-[#3bb273] text-white",
  },
  MEDIUM: {
    label: "Prioritas Sedang",
    dot: "bg-[#e69a3c]",
    badge: "bg-[#e69a3c] text-white",
  },
  HIGH: {
    label: "Prioritas Tinggi",
    dot: "bg-[#e0483d]",
    badge: "bg-[#e0483d] text-white",
  },
};

/** Short badge label (without the "Prioritas " prefix). */
export const PRIORITY_BADGE_LABEL: Record<TodoPriority, string> = {
  LOW: "Rendah",
  MEDIUM: "Sedang",
  HIGH: "Tinggi",
};

export const PRIORITY_ORDER: TodoPriority[] = ["LOW", "MEDIUM", "HIGH"];
