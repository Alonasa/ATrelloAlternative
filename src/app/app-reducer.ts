export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "loading" as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
};

type InitialStateType = typeof initialState;

export const AppReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

type ActionsType =
  | SetAppStatusACType
  | SetAppErrorACType
  | SetInitializedACType;

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;
export type SetInitializedACType = ReturnType<typeof setInitializedAC>;

export const setAppStatusAC = (status: RequestStatusType) => {
  return { type: "APP/SET-STATUS", status } as const;
};
export const setAppErrorAC = (error: string | null) => {
  return { type: "APP/SET-ERROR", error } as const;
};
export const setInitializedAC = (isInitialized: boolean) => {
  return { type: "APP/SET-INITIALIZED", isInitialized } as const;
};
