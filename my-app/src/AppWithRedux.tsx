import React, { useCallback, useEffect, useReducer, useState } from 'react';
import './App.css';
import { v1 } from 'uuid'
import Todolist from './Todolist';
import { type } from 'os';
import { AddItemForm } from './AddItemForm';
import TodolistsReducer, { addTodolistAC, addTodolistTC, changeFilterAC, changeTodolistTitleAC,  fetchTodolistsThunkTC, removeTodolistAC, removeTodolistTC, setTodolistsAC } from './TodolistsReducer';
import TaskReducers, { addTaskAC, addTaskTC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTaskTC, TaskStateType } from './TasksReducers';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './store/storeRedux';
import { TodolistDomainType } from './App';
import { TasksItemsType, TaskStatuses, todolistsAPI } from './todolists-api';



export type TasksType = {
  id: string,
  title: string,
  isDone: boolean
}
export type FilterValuesType = 'all' | 'completed' | 'active';
function AppWithRedux() {

  console.log('appp');
  
  const dispatch = useDispatch()
   const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
   const tasks = useSelector<AppRootState, TaskStateType>( state => state.tasks)
  
   useEffect( () => {
     
    dispatch(fetchTodolistsThunkTC())
   }, [])

 
  
  
  const removeTodolist = useCallback(( id:string) =>{
    const thunk = removeTodolistTC(id)
    dispatch(thunk)
   
 },[dispatch]) 
  const changeTodolistTitle = useCallback((title:string, id:string )=>{
    let action = changeTodolistTitleAC(title, id)
    dispatch(action)
    
  },[dispatch]) 
 
  const removeTask = useCallback( function (id:string, TodoListID:string) {
    let thunk = removeTaskTC(id, TodoListID)
    dispatch(thunk)
   }, []) 

   
   const changeTaskStatus = useCallback( (Taskid:string, status: TaskStatuses, TodoListID:string)=>{
    let action = changeTaskStatusAC(Taskid,  TodoListID, status)
    dispatch(action)
   }, [dispatch] ) 
   const changeTaskTitle = useCallback( (newValue:string,  TodoListID:string, id:string)=>{
    let action = changeTaskTitleAC(newValue, id, TodoListID)
    dispatch (action)
     }, [dispatch]) 
   

     const addTodolist = useCallback( (title:string)=>{
       console.log('add todolist')
      const thunk = addTodolistTC(title)
      dispatch(thunk)
      
     
      
    }, [dispatch] ) 

   const addTask = useCallback ( (title: string, TodoListID: string)=>{
    let thunk = addTaskTC(title, TodoListID)
    dispatch(thunk)
    }, [] ) 
  


   


  
   
  const changeFilter = useCallback( ( filter:FilterValuesType, TodoListID:string)=>{
    const action = changeFilterAC(filter, TodoListID)
    dispatch(action)

   }, [dispatch] ) 
  
  return (
    <div className="App">
      <AddItemForm id={'wew'} addItem={ addTodolist }/>
      {todolists.map( tl=>{
        let tasksForRender = tasks[tl.id]
        
        
       
        return(
          <Todolist
            filter={tl.filter}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTilte={changeTodolistTitle}
            title={tl.title}
            tasks = {tasksForRender}
            removeTask = {removeTask}
            changeFilter = {changeFilter}
            id={tl.id}
            changeTaskStatus = {changeTaskStatus}
            addTask={addTask}
            removeTodolist={removeTodolist} 
        
          />
          )
    })}
    </div>
  );
}

export default AppWithRedux;

function fetchTodolistsCreateTC(title: string): any {
  throw new Error('Function not implemented.');
}
