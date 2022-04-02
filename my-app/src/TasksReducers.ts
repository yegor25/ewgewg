import { type } from "os";
import React from "react";
import { addTodolistType, SetTodolistsType } from "./TodolistsReducer";
import { taskApi, TaskPriorities, TasksItemsType, TaskStatuses, todolistsAPI } from "./todolists-api";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppRootState } from "./store/storeRedux";
export type actionsType = removeTask | addTaskType | changeTaskStatusType | changeTaskTile | addTodolistType | SetTodolistsType | setTaskActionType

export type TaskStateType = {
    [key : string] : Array<TasksItemsType> 
}

type removeTask = {
    type: 'REMOVE-TASK',
    id: string,
    todoListID: string
}
type addTaskType = {
    type: "ADD-TASK",
    task: TasksItemsType
}
type changeTaskStatusType = {
    type: "CHANGE-TASK-STATUS",
    id: string,
    todoListID: string,
    status: TaskStatuses
}
type changeTaskTile = {
    type: "CHANGE-TASK-TITLE",
    id: string,
    title: string,
    todoListID: string
}
type setTaskActionType = {
    type: 'SET-TASKS',
    tasks: Array<TasksItemsType>,
    todolistID: string
}

const initialState = {
    
  }

export const TaskReducers = (state: TaskStateType = initialState, action: actionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            {
                let task = state[action.todoListID]
                let taskAfterRemove = task.filter(t => t.id !== action.id)
                state[action.todoListID] = taskAfterRemove
                return { ...state }
            }
        case "ADD-TODOLIST" : 
            {
                return {...state, [action.todolist.id] : []}
            }
        case 'SET-TODOLISTS' : 
            {
                const copyState = {...state}
                action.todolists.forEach( tl => copyState[tl.id] = [])
                return copyState
            }

        case "ADD-TASK":
            {    let stateCopy = {...state}
                 let newTask = action.task
                 const tasks = stateCopy[newTask.todoListId]
                 const newTasks = [newTask, ...tasks]
                 state[newTask.todoListId] = newTasks
                 return stateCopy
            }
            
        case "CHANGE-TASK-STATUS":
            let todolists = state[action.todoListID]
             state[action.todoListID] = todolists.map(tl=> tl.id === action.id ? {...tl, status:action.status} : tl)
            //state[action.todoListID] = newStatus;
            return {...state}
        case "CHANGE-TASK-TITLE":
            {
                let task = state[action.todoListID]
               /* let needTask = task.find(t => t.id === action.id)
                if (needTask) {
                    needTask.title = action.title
                    
                }
                state[action.todoListID] = [...task]*/
                state[action.todoListID] = task.map( t=> t.id === action.id
                    ? {...t, title: action.title}
                    : t)
                return {...state}
            }
       case "SET-TASKS": {
            let copyState = {...state}
            copyState[action.todolistID] = action.tasks
            return copyState
        }

        default:
            return state
    }
}
export const removeTaskAC = (id:string,todolistID: string): removeTask => {
    return { type: "REMOVE-TASK" , id:id, todoListID:todolistID }
}
export const addTaskAC = (task: TasksItemsType): addTaskType => {
    return { type: "ADD-TASK", task }
}
export const changeTaskStatusAC = (id: string, todoListID: string, status: TaskStatuses): changeTaskStatusType => {
    return { type: "CHANGE-TASK-STATUS", id: id, todoListID:todoListID, status: status  }
}
export const changeTaskTitleAC = (title: string, todoListID:string, id: string): changeTaskTile => {
    return { type: "CHANGE-TASK-TITLE",todoListID:todoListID ,id: id, title: title }
}
export const setTasksAC = (tasks: Array<TasksItemsType>, todolistID:string): setTaskActionType => {
    return {type:"SET-TASKS", tasks, todolistID}
}
export const fetchTasksThunkTC = (todoListID: string) => {
    return (dispatch: Dispatch) => {
        taskApi.getTasks(todoListID)
        .then( (res) => {
            dispatch(setTasksAC(res.data.items, todoListID))
        })
    }
}
export const removeTaskTC = (taskID: string, todoListID: string) => {
    return (dispatch: Dispatch) => {
        taskApi.deleteTasks(todoListID, taskID)
        .then(res => {
            const action = removeTaskAC(taskID, todoListID)
            dispatch(action)
        })
    }
}
export const addTaskTC = (title: string, todoListID:string) => {
    return (dispatch: ThunkDispatch<AppRootState, unknown, actionsType>) => {
        taskApi.createTask(todoListID, title)
        .then( res => {
            const action = addTaskAC(res.data.data.item)
            dispatch (action)
            dispatch(fetchTasksThunkTC(todoListID))
        })
    }
}
export default TaskReducers