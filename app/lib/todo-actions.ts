"use server";

import { revalidatePath } from "next/cache";

import { ApiError } from "@/app/lib/api";
import { authFetch } from "@/app/lib/server-api";
import {
  mapGroup,
  mapItem,
  type ApiEnvelope,
  type TodoItemDTO,
  type TodoListDTO,
} from "@/app/lib/todo-service";
import type {
  TodoGroup,
  TodoItem,
  TodoPriority,
} from "@/types/todo-interface";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function fail(err: unknown): { ok: false; error: string } {
  if (err instanceof ApiError) return { ok: false, error: err.message };
  return { ok: false, error: "Terjadi kesalahan. Silakan coba lagi." };
}

/* -------------------------------- groups -------------------------------- */

export async function createGroupAction(input: {
  name: string;
}): Promise<ActionResult<TodoGroup>> {
  try {
    const res = await authFetch<ApiEnvelope<TodoListDTO>>("/v1/todos/lists", {
      method: "POST",
      body: JSON.stringify({ title: input.name }),
    });
    revalidatePath("/todo");
    return { ok: true, data: mapGroup(res.data) };
  } catch (err) {
    return fail(err);
  }
}

export async function renameGroupAction(input: {
  id: string;
  name: string;
}): Promise<ActionResult<TodoGroup>> {
  try {
    const res = await authFetch<ApiEnvelope<TodoListDTO>>(
      `/v1/todos/lists/${input.id}`,
      { method: "PATCH", body: JSON.stringify({ title: input.name }) },
    );
    revalidatePath("/todo");
    return { ok: true, data: mapGroup(res.data) };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteGroupAction(input: {
  id: string;
}): Promise<ActionResult<{ id: string }>> {
  try {
    await authFetch<unknown>(`/v1/todos/lists/${input.id}`, {
      method: "DELETE",
    });
    revalidatePath("/todo");
    return { ok: true, data: { id: input.id } };
  } catch (err) {
    return fail(err);
  }
}

/* --------------------------------- items -------------------------------- */

export async function createItemAction(input: {
  groupId: string;
  title: string;
  description?: string;
  priority: TodoPriority;
}): Promise<ActionResult<TodoItem>> {
  try {
    const res = await authFetch<ApiEnvelope<TodoItemDTO>>("/v1/todos/items", {
      method: "POST",
      body: JSON.stringify({
        title: input.title,
        description: input.description,
        priority: input.priority,
        todoListId: input.groupId,
      }),
    });
    revalidatePath("/todo");
    return { ok: true, data: mapItem(res.data) };
  } catch (err) {
    return fail(err);
  }
}

export async function updateItemAction(input: {
  id: string;
  title: string;
  description?: string;
  priority: TodoPriority;
}): Promise<ActionResult<TodoItem>> {
  try {
    const res = await authFetch<ApiEnvelope<TodoItemDTO>>(
      `/v1/todos/items/${input.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title: input.title,
          description: input.description,
          priority: input.priority,
        }),
      },
    );
    revalidatePath("/todo");
    return { ok: true, data: mapItem(res.data) };
  } catch (err) {
    return fail(err);
  }
}

export async function completeItemAction(input: {
  id: string;
  isCompleted: boolean;
}): Promise<ActionResult<TodoItem>> {
  try {
    const res = await authFetch<ApiEnvelope<TodoItemDTO>>(
      `/v1/todos/items/${input.id}/complete`,
      {
        method: "POST",
        body: JSON.stringify({ isCompleted: input.isCompleted }),
      },
    );
    revalidatePath("/todo");
    return { ok: true, data: mapItem(res.data) };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteItemAction(input: {
  id: string;
}): Promise<ActionResult<{ id: string }>> {
  try {
    await authFetch<unknown>(`/v1/todos/items/${input.id}`, {
      method: "DELETE",
    });
    revalidatePath("/todo");
    return { ok: true, data: { id: input.id } };
  } catch (err) {
    return fail(err);
  }
}

/**
 * Persist a new ordering for the items within a single group. `orderedItemIds`
 * must already be in the desired top-to-bottom order; positions are assigned
 * by index. The backend requires every item to belong to `groupId`.
 */
export async function reorderItemsAction(input: {
  groupId: string;
  orderedItemIds: string[];
}): Promise<ActionResult<{ groupId: string }>> {
  try {
    await authFetch<unknown>("/v1/todos/items/reorder", {
      method: "POST",
      body: JSON.stringify({
        todoListId: input.groupId,
        items: input.orderedItemIds.map((itemId, index) => ({
          itemId,
          newOrder: index,
        })),
      }),
    });
    revalidatePath("/todo");
    return { ok: true, data: { groupId: input.groupId } };
  } catch (err) {
    return fail(err);
  }
}
