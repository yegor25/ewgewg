import { title } from "process";
import React from "react";
import { v1 } from "uuid";
import TaskReducers, { addTaskAC, changeTaskTitleAC, removeTaskAC } from "../TasksReducers";
import { TaskPriorities, TaskStatuses } from "../todolists-api";
import { addTodolistAC, setTodolistsAC } from "../TodolistsReducer";


test('add task', () => {
  let TodoListID_1 = v1()
  let TodoListID_2 = v1()
  let TodoListID_3 = v1()
  let startState = {
    [TodoListID_1]: [{ id: v1(), title: 'React', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: '' },
    { id: v1(), title: 'Html', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: '' },
    { id: v1(), title: 'CSS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: '' }],

    [TodoListID_2]: [{ id: v1(), title: 'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: '' },
    { id: v1(), title: 'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: '' },
    { id: v1(), title: 'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: '' }],

    [TodoListID_3]: [{ id: v1(), title: 'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: '' },
    { id: v1(), title: 'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: '' },
    { id: v1(), title: 'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order: 0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: '' }]
  }
  let newTitle = 'node js'
  const action = addTaskAC(newTitle, TodoListID_1)
  const endState = TaskReducers(startState, action)

  expect(endState[TodoListID_1].length).toBe(4)

})
test('remove task', () => {


  let TodoListID_1 = v1()
  let TodoListID_2 = v1()
  let TodoListID_3 = v1()
  let startState = {

    [TodoListID_1]: [ {id:'1', title:'React',status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:'2', title:'Html', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:'3', title:'CSS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}],
  
      [TodoListID_2]: [ {id:v1(), title:'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}],
      
      [TodoListID_3]: [ {id:v1(), title:'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: TodoListID_1, completed: false, startDate: '', deadline: '', addedDate: ''}]
  }
  const action = removeTaskAC('2', TodoListID_1)
  const endState = TaskReducers(startState, action)
  expect(startState[TodoListID_1].length).toBe(2)
})

 /*test('change title', () => {
  let startState = {

    ['TodoListID_1']: [ {id:'1', title:'React',status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:'2', title:'Html', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:'3', title:'CSS', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_1', completed: false, startDate: '', deadline: '', addedDate: ''}],
  
      ['TodoListID_2']: [ {id:v1(), title:'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_2', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_2', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_2', completed: false, startDate: '', deadline: '', addedDate: ''}],
      
      ['TodoListID_3']: [ {id:v1(), title:'Beer', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_3', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Coffee', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_3', completed: false, startDate: '', deadline: '', addedDate: ''}, 
                        {id:v1(), title:'Tea', status: TaskStatuses.Completed, description: '', priority: TaskPriorities.Hi, order:0, todoListId: 'TodoListID_3', completed: false, startDate: '', deadline: '', addedDate: ''}]
  }
  let newTitle = 'new'
  let action = changeTaskTitleAC(newTitle, '1', '2')
  let endState = TaskReducers(startState, action)

  expect(endState['1'][1].title).toBe('new')
})*/

test('empty array should be added', () => {
  const action = setTodolistsAC([
    {id: '1', title: '1', order: 0, addedDate:''},
    {id: '2', title: '2', order: 0, addedDate:''}
  ])
  const endState = TaskReducers({}, action)
  const keys = Object.keys(endState)
  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
})