import { authFetch } from "@/app/lib/server-api";
import type {
  TodoGroup,
  TodoItem,
  TodoPriority,
} from "@/types/todo-interface";

// The backend wraps every successful response in the standard envelope.
export type ApiEnvelope<T> = {
  statusCode: number;
  message: string | null;
  data: T;
};

/** Raw todo item as returned by the backend (`/v1/todos`). */
export type TodoItemDTO = {
  id: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  completedAt?: string | null;
  priority: TodoPriority;
  order: number;
  todoListId: string;
  createdAt: string;
  updatedAt: string;
};

/** Raw todo list (a "group" in the UI), optionally with nested items + stats. */
export type TodoListDTO = {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  userId: string;
  items?: TodoItemDTO[];
  totalItems?: number;
  completedItems?: number;
  completionRate?: number;
  createdAt: string;
  updatedAt: string;
};

const byOrder = <T extends { order: number; createdAt: string }>(a: T, b: T) =>
  a.order - b.order || a.createdAt.localeCompare(b.createdAt);

export function mapItem(item: TodoItemDTO): TodoItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description ?? "",
    priority: item.priority,
    done: item.isCompleted,
  };
}

export function mapGroup(list: TodoListDTO): TodoGroup {
  return {
    id: list.id,
    name: list.title,
    items: [...(list.items ?? [])].sort(byOrder).map(mapItem),
  };
}

/**
 * Fetch the signed-in user's todo lists (with nested items) and shape them for
 * the board.
 *
 * Render-safe: any failure degrades to an empty board rather than throwing, so
 * an expired token during a Server Component render (where cookies can't be
 * rewritten) doesn't crash the page. The middleware refreshes tokens before
 * render, so this is the rare fallback path.
 */
export async function getTodoGroups(): Promise<TodoGroup[]> {
  try {
    const res = await authFetch<ApiEnvelope<TodoListDTO[]>>("/v1/todos/lists");
    const lists = Array.isArray(res?.data) ? res.data : [];
    return [...lists].sort(byOrder).map(mapGroup);
  } catch {
    return [];
  }
}
