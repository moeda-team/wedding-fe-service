import { authFetch } from "@/app/lib/server-api";

export type NotificationType =
  | "SYSTEM"
  | "PAYMENT"
  | "INVITATION"
  | "GUEST"
  | "TODO"
  | "TEMPLATE";

export type NotificationDTO = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string | null;
  isRead: boolean;
  readAt?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

// Paginated list endpoints flatten the array onto the top-level `data` (with
// pagination meta moved to `paginate`); empty results arrive as `data: null`.
type ApiEnvelope<T> = {
  statusCode: number;
  message: string | null;
  data: T | null;
};

/**
 * Fetch the most recent notifications for the signed-in user.
 *
 * Render-safe: failures (including an expired token during a Server Component
 * render) degrade to an empty list rather than throwing.
 */
export async function getNotifications(
  perPage = 8,
): Promise<NotificationDTO[]> {
  try {
    const res = await authFetch<ApiEnvelope<NotificationDTO[]>>(
      `/v1/notifications?perPage=${perPage}`,
    );
    return Array.isArray(res?.data) ? res.data : [];
  } catch {
    return [];
  }
}

/** Unread notification count. Render-safe (degrades to 0). */
export async function getUnreadCount(): Promise<number> {
  try {
    const res = await authFetch<ApiEnvelope<{ count: number }>>(
      "/v1/notifications/unread-count",
    );
    return res?.data?.count ?? 0;
  } catch {
    return 0;
  }
}
