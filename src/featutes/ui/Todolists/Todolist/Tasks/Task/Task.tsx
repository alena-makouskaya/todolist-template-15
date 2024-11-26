// @flow
import * as React from "react";
import { TaskType } from "../../../../../api/tasksAPI.types";
import { useAppDispatch } from "../../../../../../app/store";
import { TodolistDomainType } from "../../../../../models/todolists-reducer";
import { deleteTaskTC, updateTaskTC } from "../../../../../models/tasks-reducer";
import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan";
import { TaskStatus } from "../../../../../../common/enums/enums";

type Props = {
  todolist: TodolistDomainType;
  task: TaskType;
};

export const Task = ({ todolist, task }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskTC(todolist.id, task.id));
  };

  const updateTask = (title: string) => {
    dispatch(updateTaskTC(todolist.id, task.id, {title}))
  }
  const changeTaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC(todolist.id, task.id, {status: value}))
  }

  return (
    <div className="task">
      <div className="taskInput">
        <input type="checkbox" className="taskCheckbox" checked={task.status === TaskStatus.Completed ? true : false} onChange={changeTaskStatus}/>
        <EditableSpan title={task.title} callback={updateTask}/>
      </div>
      <button className="errorButton" onClick={deleteTask}> x </button>
    </div>
  );
};
