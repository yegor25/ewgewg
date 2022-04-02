import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import TaskReducers from "../TasksReducers";
import { TaskPriorities, TaskStatuses } from "../todolists-api";
import TodolistsReducer from "../TodolistsReducer";
import { AppRootState, store } from "./storeRedux";


const rooReducer = combineReducers(
    {
        tasks: TaskReducers,
        todolists: TodolistsReducer
    }
)
const initialGlobalState = {
    todolists: [
        {id:"todolistID1", title: "what to learn", filter: "all", addedDate: '', order: 0},
        {id:"todolistID2", title: "what to buy", filter: "all", addedDate: '', order: 0},
    ],
    tasks:  {
        ['TodoListID_1']: [ {id:v1(), title:'React',status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                          {id:v1(), title:'Html', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                          {id:v1(), title:'CSS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}],
    
        ['TodoListID_2']: [ {id:v1(), title:'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_2', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                          {id:v1(), title:'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_2', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                          {id:v1(), title:'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_2', completed: false, startDate: '', deadline: '', addedDate: ''}],
        
        ['TodoListID_3']: [ {id:v1(), title:'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                          {id:v1(), title:'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                          {id:v1(), title:'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}]
      }
}
export const storyBookStore = createStore(rooReducer, initialGlobalState as AppRootState)
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
} 