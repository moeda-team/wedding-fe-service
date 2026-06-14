import { authFetch } from "@/app/lib/server-api";

// The backend wraps every successful response in the standard envelope.
type ApiEnvelope<T> = {
  statusCode: number;
  message: string | null;
  data: T;
};

// Shape returned by GET /v1/invitations/stats (counts computed in the DB).
type InvitationStats = {
  total: number;
  draft: number;
  pendingPayment: number;
  active: number;
};

export type DashboardStats = {
  /** Total invitations the user owns. */
  total: number;
  /** Created but not yet paid for ("Menunggu Aktivasi"). */
  pending: number;
  /** Paid and live ("Undangan Aktif"). */
  active: number;
};

const EMPTY_STATS: DashboardStats = { total: 0, pending: 0, active: 0 };

/**
 * Fetch the signed-in user's dashboard counters.
 *
 * Backed by GET /v1/invitations/stats, which aggregates counts by status in a
 * single grouped query (no row scanning, no perPage cap).
 *
 * Render-safe: any failure (including an expired token during a Server
 * Component render, where cookies can't be rewritten) degrades to zeros rather
 * than throwing. The middleware refreshes tokens before render, so this is the
 * rare fallback path.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await authFetch<ApiEnvelope<InvitationStats>>(
      "/v1/invitations/stats",
    );
    const stats = res?.data;
    if (!stats) return { ...EMPTY_STATS };

    return {
      total: stats.total ?? 0,
      pending: stats.pendingPayment ?? 0,
      active: stats.active ?? 0,
    };
  } catch {
    return { ...EMPTY_STATS };
  }
}
