// @flow 
import * as React from 'react';
import { FilterValueType, TodolistDomainType, changeTodolistFilterAC } from '../../../../models/todolists-reducer';
import { useAppDispatch } from '../../../../../app/store';
type Props = {
    todolist: TodolistDomainType;
  };
  
export const FilterTasksButtons = ({todolist}: Props) => {
    const dispatch = useAppDispatch();

    const changeTodolistFilter = (filter: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolist.id, filter))
    }

    return (
        <div className='filterTasksButtons'>
            <button className={todolist.filter === "all" ? 'isActive' : ""} onClick={() => changeTodolistFilter("all")}>All</button>
            <button className={todolist.filter === "active" ? 'isActive' : ""} onClick={() => changeTodolistFilter("active")}>Active</button>
            <button className={todolist.filter === "completed" ? 'isActive' : ""} onClick={() => changeTodolistFilter("completed")}>Completed</button>
            
        </div>
    );
};