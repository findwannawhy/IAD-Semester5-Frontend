import type { AcidSolubleSample } from "./SamplesTypes";

// Тип ответа с пагинацией
export interface PaginatedResponse {
  samples: AcidSolubleSample[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Старый метод (без пагинации)
export async function getSamples(params?: {
  name?: string;
  date_from?: string;
  date_to?: string;
  recentlyViewed?: boolean;
}): Promise<AcidSolubleSample[]> {
  try {
    let path = "/api/v1/soluble-samples";
    if (params) {
      const query = new URLSearchParams();
      if (params.name) query.append("search_sample", params.name);
      if (params.recentlyViewed) query.append("recently_viewed", "true");
      const queryString = query.toString();
      if (queryString) path += `?${queryString}`;
    }

    const res = await fetch(path, {
      headers: { Accept: "application/json" },
      credentials: "include",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return [];
  }
}

// Новый метод с пагинацией
export async function getSamplesPaginated(params: {
  name?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedResponse> {
  const defaultResponse: PaginatedResponse = {
    samples: [],
    total: 0,
    page: 1,
    limit: 20,
    total_pages: 0,
  };

  try {
    const query = new URLSearchParams();
    query.append("page", String(params.page || 1));
    query.append("limit", String(params.limit || 20));
    if (params.name) query.append("search_sample", params.name);

    const res = await fetch(`/api/v1/soluble-samples?${query.toString()}`, {
      headers: { Accept: "application/json" },
      credentials: "include",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return defaultResponse;
  }
}

export async function getSample(id: number): Promise<AcidSolubleSample | null> {
  try {
    const res = await fetch(`/api/v1/soluble-samples/${id}`, {
      headers: { Accept: "application/json" },
      credentials: "include", // Важно для отправки cookies
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return null;
  }
}
