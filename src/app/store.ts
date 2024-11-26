import { UnknownAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "../featutes/models/todolists-reducer";
import { ThunkDispatch, thunk } from "redux-thunk";
import { useDispatch } from "react-redux";
import { tasksReducer } from "../featutes/models/tasks-reducer";


export const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducers, {}, applyMiddleware(thunk))

export type AppRootState = ReturnType<typeof rootReducers>

export type AppDispatchType = ThunkDispatch<AppRootState, unknown, UnknownAction>

export const useAppDispatch = useDispatch<AppDispatchType>

// @ts-ignore
window.store = store