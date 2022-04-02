import axios, { AxiosResponse } from "axios";
import { type } from "os";
import React from "react";

const settings = {
    withCredentials: true,
    headers: {
       'API-KEY': '4ad1ef78-328d-4e76-9060-b22e7357dcba'
    }
}
const instance = axios.create( {
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistAPIType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type TodolistCreateResponseType = {
    resultCode: number
    messages: string[],
    data: {
      item: DataCreateType
    }
}
type DataCreateType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type DataDeleteResponseType  = {
    resultCode: number
    messages: ['Something wrong'],
    data: {}
}
export type DataUpdateResponseType = {
    resultCode: number,
    messages: string []
    data: {}
}
export type TasksDomainType = {
    totalCount: number,
    error: null | string,
    items: Array<TasksItemsType>
}
export type TasksItemsType = {
    description: string
title: string
completed: boolean
status: number
priority: number
startDate: string
deadline: string
id: string
todoListId: string
order: number
addedDate: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export const todolistsAPI  = {
    getTodolists ( ) {
        return instance.get<Array<TodolistAPIType>>("todo-lists")
        

    },
    createTodolists (title: string) {
        debugger
        return instance.post<TodolistCreateResponseType>(`todo-lists`,{title})
        
    },
    deleteTodolists (todoListId:string) {
        return instance.delete<DataDeleteResponseType>(`todo-lists/${todoListId}`)
        
    },
    updateTodolists () {
        return instance.put<DataUpdateResponseType>("todo-lists/434f0ff2-ed3b-413d-b67b-4082d97e8455", {title: 'yo-yo-hey'})
        

    },
    
    
}

export const taskApi = {
    getTasks (todolistID: string) {
        return instance.get<TasksDomainType>(`todo-lists/${todolistID}/tasks`)
        

    },
    deleteTasks (todoListId: string, tasksID: string) {
        return instance.delete(`todo-lists/${todoListId}/tasks/${tasksID}`)
    },
    createTask (todoListId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TasksItemsType }>>>(`todo-lists/${todoListId}/tasks`, {title: title} )
    }
}