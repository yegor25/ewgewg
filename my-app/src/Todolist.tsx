import { title } from "process";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType } from "./AppWithRedux";

import EditableSpan from "./EditableSpan";
import { fetchTasksThunkTC } from "./TasksReducers";
import {  TasksItemsType, TaskStatuses } from "./todolists-api";
type ContentType = {
    title:string
    tasks:Array<TasksItemsType>,
    removeTask:(id:string, TodoListID:string)=>void
    id:string
    filter: FilterValuesType
    changeFilter:(filter:FilterValuesType, TodoListID:string)=>void
    changeTaskStatus:(Taskid:string, status: TaskStatuses, TodoListID:string)=>void
    addTask:(newTitle:string, TodoListID:string)=>void
    removeTodolist:(TodoListID:string)=> void
    changeTaskTitle:(newValue:string, id:string, TodoListID:string)=>void
    changeTodolistTilte:(title:string, id:string)=> void
    
}
const Todolist = React.memo (  (props: ContentType) =>{
const dispatch = useDispatch()
useEffect( () => {
    dispatch(fetchTasksThunkTC(props.id))
},[props.id])
    console.log('todolist is called');
    let tasksForRender = props.tasks
    if(props.filter === 'active'){
        tasksForRender = props.tasks.filter(t=>t.status === TaskStatuses.New)
      }
      if(props.filter === 'completed'){
        tasksForRender = props.tasks.filter(t=>t.status === TaskStatuses.Completed)
      }
    return(
        <div>
             <h3>
                 <EditableSpan title={props.title} onChange = {(title)=>{props.changeTodolistTilte(title, props.id)}}/>
                 <button onClick={()=> {props.removeTodolist(props.id)}}>x</button>
             </h3>
             <AddItemForm id={props.id} addItem={props.addTask}/>
             {tasksForRender.map(t=>
                <div>
                <EditableSpan title={t.title} onChange={(newValue)=>{props.changeTaskTitle(newValue, t.id, props.id)}}/>
                <input onChange={(e)=>{props.changeTaskStatus(t.id,e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,props.id)}} type="checkbox" checked = {t.status === TaskStatuses.Completed}/>
                 <button onClick = {()=>{props.removeTask(t.id,props.id)}}>x</button>
                </div>
                 
                )}
                <button onClick={()=>{props.changeFilter('all', props.id)}}>ALL</button>  
                <button onClick={()=>{props.changeFilter('active', props.id)}}>ACTIVE</button>  
                <button onClick={()=>{props.changeFilter('completed', props.id)}}>COMPLETED</button>  
             
            
           
            
            
        </div>
    )
} )


export default Todolist;