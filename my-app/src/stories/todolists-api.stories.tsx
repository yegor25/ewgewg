import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { taskApi, todolistsAPI } from '../todolists-api'

export default {
   title: 'API',
  
}
const settings = {
   withCredentials: true,
   headers: {
      'API-KEY': '4ad1ef78-328d-4e76-9060-b22e7357dcba'
   }
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>({name: 'Dimych'})
   useEffect(() => {
       // здесь мы будем делать запрос и ответ закидывать в стейт.
       // который в виде строки будем отображать в div-ке
      todolistsAPI.getTodolists()
      .then( (res) => {
         setState(res.data)
      })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = (title: string) => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.createTodolists(title)
      .then( (res) => {
         setState(res.data)
      })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = (todolistID:string) => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.deleteTodolists(todolistID)
      .then( (res) => {
         setState(res.data)
      })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      
      todolistsAPI.updateTodolists()
      .then( (res) => {
         setState(res.data)
      })
   }, [])

   return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
   const [state, setState] = useState<any>({name: 'Dimych'})
   const [todolistID, setTodolistID] = useState('')
   
       // здесь мы будем делать запрос и ответ закидывать в стейт.
       // который в виде строки будем отображать в div-ке
     
      
   

   return <div> {JSON.stringify(state)}
   <div>
      <input type="text" placeholder='todolistID' value={todolistID} onChange = {
         (e) => { setTodolistID(e.currentTarget.value)}
      } />
      <button onClick={ () =>  taskApi.getTasks(todolistID)
      .then( (res) => {
         debugger
         setState(res.data)
      }) }> get tasks</button>
   </div>
   </div>
}
export const CreateTasks = () => {

   const [state, setState] = useState<any>({name: 'Dimych'})
   const [todolistID, setTodolistID] = useState('')
   const [title, setTitle] = useState('')
   
       // здесь мы будем делать запрос и ответ закидывать в стейт.
       // который в виде строки будем отображать в div-ке
     
      
   

   return <div> {JSON.stringify(state)}
   <div>
      <input type="text" placeholder='todolistID' value={todolistID} onChange = {
         (e) => { setTodolistID(e.currentTarget.value)}} />
      <input type="text" placeholder='title' value={title} onChange = { e => setTitle(e.currentTarget.value)} />
      <button onClick={ () =>  taskApi.createTask(todolistID, title)
      .then( (res) => {
         debugger
         setState(res.data)
      }) }> addTask</button>
   </div>
   </div>
}

export const DeleteTasks = () => {

   const [state, setState] = useState<any>({name: 'Dimych'})
   const [todolistID, setTodolistID] = useState('')
   const [taskID, setTaskID] = useState('')
   
       // здесь мы будем делать запрос и ответ закидывать в стейт.
       // который в виде строки будем отображать в div-ке
     
      
   

   return <div> {JSON.stringify(state)}
   <div>
      <input type="text" placeholder='todolistID' value={todolistID} onChange = {
         (e) => { setTodolistID(e.currentTarget.value)}} />
      <input type="text" placeholder='taskID' value={taskID} onChange = { e => setTaskID(e.currentTarget.value)} />
      <button onClick={ () =>  taskApi.deleteTasks(todolistID, taskID)
      .then( (res) => {
         debugger
         setState(res.data)
      }) }> delete Task</button>
   </div>
   </div>
}
//a788e78c-7f82-4f65-a5d4-4e360bdac66d