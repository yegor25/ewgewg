import React, { useReducer, useState } from 'react';
import './App.css';
import { v1 } from 'uuid'
import Todolist from './Todolist';
import { type } from 'os';
import { AddItemForm } from './AddItemForm';
import TodolistsReducer, { addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC } from './TodolistsReducer';
import TaskReducers, { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './TasksReducers';
import { TaskPriorities, TaskStatuses, TodolistAPIType } from './todolists-api';





export type FilterValuesType = 'all' | 'completed' | 'active';
//new types api
export type TodolistDomainType = TodolistAPIType & {
  filter: FilterValuesType
}
function App() {

  const TodoListID_1 = v1();
  const TodoListID_2 = v1();
  const TodoListID_3 = v1();
  //const [filter, setFilter] = useState<FilterValuesType>('all')
  let [todolistState, dispatch] = useReducer(TodolistsReducer,  [
    {id:TodoListID_1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
    {id:TodoListID_2, title: 'what to buy', filter: 'all', addedDate: '', order: 0},
    {id:TodoListID_3, title: 'what to do', filter: 'all', addedDate: '', order: 0}
  ])

  let [taskState, dispatchTask] = useReducer(TaskReducers,  
    {
      [TodoListID_1]: [ {id:v1(), title:'React',status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Html', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'CSS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}],
  
      [TodoListID_2]: [ {id:v1(), title:'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}],
      
      [TodoListID_3]: [ {id:v1(), title:'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}]
    }
  )


  
  
  const removeTodolist = ( id:string) =>{
     const action = removeTodolistAC(id)
     dispatch(action)
    
  }
  const changeTodolistTitle = (title:string, id:string )=>{
    let action = changeTodolistTitleAC(title, id)
    dispatch(action)
    
  }
  const removeTask = (id:string, TodoListID:string) =>{
          
    let action = removeTaskAC(id, TodoListID)
    dispatchTask(action)
   }

   
   const changeTaskStatus = (Taskid:string, status: TaskStatuses, TodoListID:string)=>{
    let action = changeTaskStatusAC(Taskid,  TodoListID, status)
    dispatchTask(action)
   }
   const changeTaskTitle = (newValue:string, id:string, TodoListID:string)=>{
    let action = changeTaskTitleAC(newValue, id, TodoListID)
    dispatchTask (action)
     }
   

     const addTodolist = (title:string)=>{
      const action = addTodolistAC({id:TodoListID_1, title: title,  addedDate: '', order: 0}) 
      dispatch(action)
      dispatchTask(action)
      
     
      
    }

   const addTask = (newTitle: string, TodoListID:string)=>{
   let action = addTaskAC({ id: v1(), title: newTitle, status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID, completed: false, startDate: '', deadline: '', addedDate: '' })
   dispatchTask (action)
   }
  


   


  
   
  const changeFilter = ( filter:FilterValuesType, TodoListID:string)=>{
    const action = changeFilterAC(filter, TodoListID)
    dispatch(action)

   }
  
  return (
    <div className="App">
      <AddItemForm id={'wew'} addItem={ addTodolist }/>
      {todolistState.map( tl=>{
        let tasksForRender = taskState[tl.id]
        console.log('tasksForRender ', tasksForRender);
        
        if(tl.filter === 'active'){
          tasksForRender = taskState[tl.id].filter(t=>t.status === TaskStatuses.New)
        }
        if(tl.filter === 'completed'){
          tasksForRender = taskState[tl.id].filter(t=>t.status === TaskStatuses.Completed)
        }
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

export default App;
