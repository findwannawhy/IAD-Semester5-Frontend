import type { ExperimentDraftInfo } from "./ExperimentsTypes";
import { dest_api } from "../target_config";

export async function getExperimentDraft(): Promise<ExperimentDraftInfo> {
  try {
    const res = await fetch(`${dest_api}/api/v1/impurity-experiments/draft`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ExperimentDraftInfo;
    return data;
  } catch (_err) {
    return { experiment_id: 0, sample_count: 0 };
  }
}
