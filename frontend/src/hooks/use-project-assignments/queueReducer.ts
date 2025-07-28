import { LocalProject } from "@/types/LocalProject";

export interface QueueState {
  queuedAdditions: LocalProject[];
  queuedDeletions: string[];
}

export const initialState: QueueState = { queuedAdditions: [], queuedDeletions: [] };

export type QueueAction =
  | { type: "reset" }
  | { type: "addProjectToQueue"; payload: LocalProject }
  | { type: "removeQueuedProject"; tmpId: string }
  | { type: "toggleDelete"; id: string };

export function queueReducer(
  state: QueueState,
  action: QueueAction
): QueueState {
  switch (action.type) {
    case "reset":
      return initialState;

    case "addProjectToQueue":
      return { ...state, queuedAdditions: [...state.queuedAdditions, action.payload] };

    case "removeQueuedProject":
      return {
        ...state,
        queuedAdditions: state.queuedAdditions.filter((q) => q.tmpId !== action.tmpId),
      };

    case "toggleDelete":
      return state.queuedDeletions.includes(action.id)
        ? {
            ...state,
            queuedDeletions: state.queuedDeletions.filter((d) => d !== action.id),
          }
        : { ...state, queuedDeletions: [...state.queuedDeletions, action.id] };

    default:
      return state;
  }
}
