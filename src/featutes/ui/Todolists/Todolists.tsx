// @flow
import * as React from "react";
import { Todolist } from "./Todolist/Todolist";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "../../../app/store";
import {
  TodolistDomainType,
  setTodolistsTC,
} from "../../models/todolists-reducer";

type Props = {};

export const Todolists = (props: Props) => {
  const dispatch = useAppDispatch();
  const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(
    (state) => state.todolists
  );

  React.useEffect(() => {
    dispatch(setTodolistsTC());
  }, []);

  return (
    <div className="todolists">
      {todolists.map((todolist) => (
        <Todolist todolist={todolist} />
      ))}
    </div>
  );
};
