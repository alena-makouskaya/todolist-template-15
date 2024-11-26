// @flow 
import * as React from 'react';
import { Task } from './Task/Task';
import { TodolistDomainType } from '../../../../models/todolists-reducer';
import { AppRootState, useAppDispatch } from '../../../../../app/store';
import { useSelector } from 'react-redux';
import { TaskStateType, setTasksTC } from '../../../../models/tasks-reducer';
import { TaskStatus } from '../../../../../common/enums/enums';

type Props = {
    todolist: TodolistDomainType;
};

export const Tasks = ({todolist}: Props) => {
    const dispatch = useAppDispatch();

    const tasks = useSelector<AppRootState, TaskStateType>(
      (state) => state.tasks
    );
  
    React.useEffect(() => {
      dispatch(setTasksTC(todolist.id));
    }, []);

    const tasksInTodolist = tasks[todolist.id]
    let filteredTasks = tasksInTodolist

    if(todolist.filter === "active") {
        filteredTasks = tasksInTodolist.filter((task) => task.status !== TaskStatus.Completed)
    }
    if(todolist.filter === "completed") {
        filteredTasks = tasksInTodolist.filter((task) => task.status === TaskStatus.Completed)
    }

    return (
        <div className='tasks'>
            {
                filteredTasks.map((task) => <Task key={task.id} todolist={todolist} task={task}/>)
            }
        </div>
    );
};