import { error } from "console";

// initial state
const initalState = {
    status: 'idle' as RequestStatus,
    error: null as string | null
}

export const appReducer = (state: InitialStateType = initalState, action: ActionsType ): InitialStateType => {
  switch (action.type) {

    case "SET-APP-STATUS":
        return {...state, status: action.status}

    case "SET-APP-ERROR":
        return {...state, error: action.error}

    default:
      return state;
  }
};

// types
type InitialStateType = typeof initalState
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionsType = SetAppStatusActionType | SetAppErrorActionType

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

// action creators
export const setAppStatusAC = (status: RequestStatus) => 
    ({type: "SET-APP-STATUS", status} as const)

export const setAppErrorAC = (error: string | null) => 
    ({type: "SET-APP-ERROR", error} as const)





