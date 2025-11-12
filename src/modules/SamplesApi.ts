import type { AcidSolubleSample } from "./SamplesTypes";
import { dest_api } from "../target_config";

export async function getSamples(params?: { name?: string; date_from?: string; date_to?: string }): Promise<AcidSolubleSample[]> {
  try {
    let path = dest_api + "/api/v1/soluble-samples";
    if (params) {
      const query = new URLSearchParams();
      if (params.name) query.append("search_sample", params.name);
      const queryString = query.toString();
      if (queryString) path += `?${queryString}`;
    }

    const res = await fetch(path, { 
      headers: { Accept: "application/json" },
      credentials: 'include' // Важно для отправки cookies
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return [];
  }
}

export async function getSample(id: number): Promise<AcidSolubleSample | null> {
  try {
    const res = await fetch(`${dest_api}/api/v1/soluble-samples/${id}`, { 
      headers: { Accept: "application/json" },
      credentials: 'include' // Важно для отправки cookies
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function getRecentlyViewedSamples(): Promise<AcidSolubleSample[]> {
  try {
    const res = await fetch(`${dest_api}/api/v1/soluble-samples/recently-viewed/list`, { 
      headers: { Accept: "application/json" },
      credentials: 'include' // Важно для отправки cookies
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return [];
  }
}