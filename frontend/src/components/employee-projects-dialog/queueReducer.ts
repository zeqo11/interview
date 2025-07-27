import { LocalProject } from "@/types/LocalProject";

export interface QueueState {
  queuedAdds: LocalProject[];
  queuedDeletes: string[];
}

export const initialState: QueueState = { queuedAdds: [], queuedDeletes: [] };

export type QueueAction =
  | { type: "reset" }
  | { type: "queueAdd"; payload: LocalProject }
  | { type: "removeQueuedAdd"; tmpId: string }
  | { type: "toggleDelete"; id: string };

export function queueReducer(
  state: QueueState,
  action: QueueAction
): QueueState {
  switch (action.type) {
    case "reset":
      return initialState;

    case "queueAdd":
      return { ...state, queuedAdds: [...state.queuedAdds, action.payload] };

    case "removeQueuedAdd":
      return {
        ...state,
        queuedAdds: state.queuedAdds.filter((q) => q.tmpId !== action.tmpId),
      };

    case "toggleDelete":
      return state.queuedDeletes.includes(action.id)
        ? {
            ...state,
            queuedDeletes: state.queuedDeletes.filter((d) => d !== action.id),
          }
        : { ...state, queuedDeletes: [...state.queuedDeletes, action.id] };

    default:
      return state;
  }
}
