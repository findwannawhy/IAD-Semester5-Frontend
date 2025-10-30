import type { AcidSolubleSample } from "./SamplesTypes";

export async function getSamples(params?: { name?: string; date_from?: string; date_to?: string }): Promise<AcidSolubleSample[]> {
  try {
    let path = "/api/v1/soluble-samples";
    if (params) {
      const query = new URLSearchParams();
      if (params.name) query.append("search_sample", params.name);
      const queryString = query.toString();
      if (queryString) path += `?${queryString}`;
    }

    const res = await fetch(path, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function getSample(id: number): Promise<AcidSolubleSample | null> {
  try {
    const res = await fetch(`/api/v1/soluble-samples/${id}`, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return null;
  }
}