// @flow
import * as React from "react";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { AddItemForm } from "../../../../common/components/AddItemForm/AddItemForm";
import { Tasks } from "./Tasks/Tasks";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { TodolistDomainType } from "../../../models/todolists-reducer";
import { useAppDispatch } from "../../../../app/store";
import { createTaskTC } from "../../../models/tasks-reducer";

type Props = {
  todolist: TodolistDomainType;
};

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const addTask = (title: string) => {
    dispatch(createTaskTC(todolist.id, title));
  };

  return (
    <div className="todolist">
      <TodolistTitle todolist={todolist} />
      <AddItemForm callback={addTask} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist}/>
    </div>
  );
};
