import { authFetch } from "@/app/lib/server-api";

// The backend wraps every successful response in the standard envelope.
type ApiEnvelope<T> = {
  statusCode: number;
  message: string | null;
  data: T;
};

type InvitationStatus = "DRAFT" | "PENDING_PAYMENT" | "ACTIVE";

type Invitation = {
  id: string;
  status: InvitationStatus;
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
 * Aggregate the signed-in user's invitations into the dashboard counters.
 *
 * Render-safe: any failure (including an expired token during a Server
 * Component render, where cookies can't be rewritten) degrades to zeros rather
 * than throwing. The middleware refreshes tokens before render, so this is the
 * rare fallback path.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await authFetch<ApiEnvelope<Invitation[]>>(
      "/v1/invitations?perPage=100",
    );
    const list = Array.isArray(res?.data) ? res.data : [];

    return list.reduce<DashboardStats>(
      (acc, inv) => {
        acc.total += 1;
        if (inv.status === "PENDING_PAYMENT") acc.pending += 1;
        else if (inv.status === "ACTIVE") acc.active += 1;
        return acc;
      },
      { ...EMPTY_STATS },
    );
  } catch {
    return { ...EMPTY_STATS };
  }
}
