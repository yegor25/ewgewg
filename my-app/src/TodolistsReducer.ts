import { type } from "os";
import React from "react";
import { FilterValuesType, TodolistDomainType} from "./App";

import { TodolistAPIType, todolistsAPI } from "./todolists-api";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppRootState } from "./store/storeRedux";
import { fetchTasksThunkTC } from "./TasksReducers";
export type actionsType = removeTodolist | addTodolistType | changeFilterType | changeTodolistTile | SetTodolistsType

export type SetTodolistsType = {
    type: 'SET-TODOLISTS',
    todolists: Array<TodolistAPIType>
}
type removeTodolist = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type addTodolistType = {
    type: "ADD-TODOLIST",
    todolist: TodolistAPIType
   
}

type changeFilterType = {
    type: "CHANGE-FILTER",
    id: string,
    filter: FilterValuesType
}
type changeTodolistTile = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}

const initialState: Array<TodolistDomainType> =  []
export const TodolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionsType): Array<TodolistDomainType> => {
    debugger
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id !== action.id)
        case "ADD-TODOLIST":{
            const newTodolist:TodolistDomainType = {...action.todolist, filter: 'all'}
            return [ newTodolist,...state]
        }
        case "CHANGE-FILTER":
            let todolists = state.find(tl => tl.id === action.id)
            if (todolists) todolists.filter = action.filter
            return [...state]
        case "CHANGE-TODOLIST-TITLE":
            {
                let needTodolist = state.find(t => t.id === action.id)
                if (needTodolist) {
                    needTodolist.title = action.title
                }
                return [...state] 
            }
        case 'SET-TODOLISTS' :
            
            {
                return action.todolists.map( tl => ({
                    ...tl, filter: 'all'
                })
                )
            }
                    
            default :
            return state
    }
}
export const removeTodolistAC = (todolistID: string): removeTodolist => {
    return { id: todolistID, type: "REMOVE-TODOLIST" }
}
export const addTodolistAC = (todolist:TodolistAPIType): addTodolistType => {
    return { type: "ADD-TODOLIST", todolist }
}
export const changeFilterAC = (filter: FilterValuesType, id: string): changeFilterType => {
    return { type: "CHANGE-FILTER", id: id, filter: filter }
}
export const changeTodolistTitleAC = (title: string, id: string): changeTodolistTile => {
    return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title }
}
export const setTodolistsAC = (todolists: Array<TodolistAPIType>): SetTodolistsType => {
    return {type: 'SET-TODOLISTS', todolists: todolists}
}



export const fetchTodolistsThunkTC = () => {
    return (dispatch: Dispatch) => {
        console.log('fetch thunk')
        todolistsAPI.getTodolists()
        .then( (res) => {
            console.log('response', res.data);
            
            dispatch(setTodolistsAC(res.data))
        })
    }
}

export const addTodolistTC = (title:string) => {
    debugger
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolists(title)
        .then( (res) => {
            dispatch(addTodolistAC(res.data.data.item) )
        })
    }
}

export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: ThunkDispatch<AppRootState, unknown, actionsType>) => {
        todolistsAPI.deleteTodolists(todolistID)
        .then( (res) => {
            dispatch(removeTodolistAC(todolistID))
            dispatch(fetchTasksThunkTC(todolistID))
        })
    }
}
export default TodolistsReducer