// @flow
import * as React from "react";
import { Todolists } from "../featutes/ui/Todolists/Todolists";
import { AddItemForm } from "../common/components/AddItemForm/AddItemForm";
import { useAppDispatch } from "./store";
import { createTodolistTC } from "../featutes/models/todolists-reducer";
type Props = {};
export const Main = (props: Props) => {
  const dispatch = useAppDispatch();

  const addTodolist = (title: string) => {
    dispatch(createTodolistTC(title));
  };

  return (
    <div className="main">
      <AddItemForm callback={addTodolist} />
      <Todolists />
    </div>
  );
};
