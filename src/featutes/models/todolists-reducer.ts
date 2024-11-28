import { type } from "os";
import { TodolistType } from "../api/todolistsAPI.types";
import { Dispatch } from "redux";
import { todolistsAPI } from "../api/todolistsAPI";
import {
  RequestStatus,
  setAppErrorAC,
  setAppStatusAC,
} from "../../app/app-reducer";
import { error } from "console";
import { handleServerNetworkError } from "../../common/utils/handleServerNetworkError";
import { ResultCode } from "../../common/enums/enums";
import { handleServerAppError } from "../../common/utils/handleServerAppError";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionCreators
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => {
        return {
          ...tl,
          filter: "all",
          entityStatus: "idle",
        };
      });

    case "CREATE-TODOLIST":
      return [
        { ...action.todolist, filter: "all", entityStatus: "idle" },
        ...state,
      ];

    case "DELETE-TODOLIST":
      return state.filter((tl) => tl.id !== action.todolistId);

    case "UPDATE-TODOLIST":
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, title: action.title } : tl
      );

    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, filter: action.filter } : tl
      );

    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((tl) =>
        tl.id === action.todolistId
          ? { ...tl, entityStatus: action.entityStatus }
          : tl
      );

    default:
      return state;
  }
};

// types
export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
  entityStatus: RequestStatus;
};

type ActionCreators =
  | SetTodolistsActionType
  | CreateTodolistActionType
  | DeleteTodolistActionType
  | UpdateTodolistActionType
  | CahngeTodolistFilterActionType
  | ChangeTodolistEntityStatusActionType;

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>;
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type UpdateTodolistActionType = ReturnType<typeof updateTodolistAC>;
export type ChangeTodolistEntityStatusActionType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;
export type CahngeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;

// action creators
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: "SET-TODOLISTS", todolists } as const);

export const createTodolistAC = (todolist: TodolistType) =>
  ({ type: "CREATE-TODOLIST", todolist } as const);

export const deleteTodolistAC = (todolistId: string) =>
  ({ type: "DELETE-TODOLIST", todolistId } as const);

export const updateTodolistAC = (todolistId: string, title: string) =>
  ({ type: "UPDATE-TODOLIST", todolistId, title } as const);

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValueType
) => ({ type: "CHANGE-TODOLIST-FILTER", todolistId, filter } as const);

export const changeTodolistEntityStatusAC = (
  todolistId: string,
  entityStatus: RequestStatus
) =>
  ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    todolistId,
    entityStatus,
  } as const);

// thunks
export const setTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));

  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setTodolistsAC(res.data));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));

  todolistsAPI
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"));
        dispatch(createTodolistAC(res.data.data.item));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const deleteTodolistTC =
  (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));

    todolistsAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(deleteTodolistAC(todolistId));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTodolistTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));

    todolistsAPI
      .updateTodolist(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC("succeeded"));
          dispatch(updateTodolistAC(todolistId, title));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
