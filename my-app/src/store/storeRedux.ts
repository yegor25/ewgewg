import { type } from "os";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import TaskReducers from "../TasksReducers";
import TodolistsReducer from "../TodolistsReducer";

const rootReducers = combineReducers({
    todolists: TodolistsReducer,
    tasks: TaskReducers
})

/*type AppRootState = {
    todolists: Array<TodolistType>,
    tasks: TaskStateType
}*/
export type AppRootState = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers, applyMiddleware(thunk))

// @ts-ignore
window.store = store

