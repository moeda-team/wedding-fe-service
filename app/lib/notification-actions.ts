"use server";

import { revalidatePath } from "next/cache";

import { ApiError } from "@/app/lib/api";
import { authFetch } from "@/app/lib/server-api";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function fail(err: unknown): { ok: false; error: string } {
  if (err instanceof ApiError) return { ok: false, error: err.message };
  return { ok: false, error: "Terjadi kesalahan. Silakan coba lagi." };
}

export async function markNotificationReadAction(input: {
  id: string;
}): Promise<ActionResult<{ id: string }>> {
  try {
    await authFetch<unknown>(`/v1/notifications/${input.id}/read`, {
      method: "POST",
    });
    revalidatePath("/", "layout");
    return { ok: true, data: { id: input.id } };
  } catch (err) {
    return fail(err);
  }
}

export async function markAllNotificationsReadAction(): Promise<
  ActionResult<{ ok: true }>
> {
  try {
    await authFetch<unknown>("/v1/notifications/read-all", { method: "POST" });
    revalidatePath("/", "layout");
    return { ok: true, data: { ok: true } };
  } catch (err) {
    return fail(err);
  }
}

export async function deleteNotificationAction(input: {
  id: string;
}): Promise<ActionResult<{ id: string }>> {
  try {
    await authFetch<unknown>(`/v1/notifications/${input.id}`, {
      method: "DELETE",
    });
    revalidatePath("/", "layout");
    return { ok: true, data: { id: input.id } };
  } catch (err) {
    return fail(err);
  }
}
