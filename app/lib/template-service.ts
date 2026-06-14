import { apiFetch } from "@/app/lib/api";

export type TemplateCard = {
  id: string;
  title: string;
  image: string;
};

// Paginated list endpoints flatten the array onto the top-level `data` (with
// pagination meta moved to `paginate`); empty results arrive as `data: null`.
type ApiEnvelope<T> = {
  statusCode: number;
  message: string | null;
  data: T | null;
};

type TemplateDTO = {
  id: string;
  name: string;
  thumbnail: string;
  previewUrl?: string | null;
  category?: string | null;
};

/**
 * Fetch public, active templates for the dashboard carousel.
 *
 * Public endpoint (no auth). Render-safe: any failure degrades to an empty
 * list so the dashboard can fall back to its static placeholders.
 */
export async function getPublicTemplates(
  perPage = 12,
): Promise<TemplateCard[]> {
  try {
    const res = await apiFetch<ApiEnvelope<TemplateDTO[]>>(
      `/v1/templates/public?perPage=${perPage}`,
    );
    const list = Array.isArray(res?.data) ? res.data : [];
    return list
      .filter((t) => Boolean(t.thumbnail))
      .map((t) => ({ id: t.id, title: t.name, image: t.thumbnail }));
  } catch {
    return [];
  }
}
