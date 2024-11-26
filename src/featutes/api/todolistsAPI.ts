import { instance } from "../../common/instance/instance"
import { BaseResponce } from "../../common/types/types"
import { TodolistType } from "./todolistsAPI.types"


export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>(`todo-lists`)
    },

    createTodolist(title: string) {
        return instance.post<BaseResponce<{item: TodolistType}>>(`todo-lists`, {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponce>(`todo-lists/${todolistId}`)
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponce>(`todo-lists/${todolistId}`, {title})
    },




}