import { v1 } from "uuid"
import { TodolistDomainType } from "../App"

import TodolistsReducer, { addTodolistAC, removeTodolistAC, setTodolistsAC } from "../TodolistsReducer"



test('correct todolist adding', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()
    const startState: Array<TodolistDomainType> = [
        { id: todolistID1, title: 'what to learn', filter: 'all', addedDate: '', order: 0 },
        { id: todolistID2, title: 'what to buy', filter: 'all' , addedDate: '', order: 0 },
        { id: todolistID3, title: 'what to do', filter: 'all' , addedDate: '', order: 0 }
    ]
    const endState = TodolistsReducer(startState, {
        type: 'CHANGE-FILTER',
        id: todolistID2,
        filter: 'completed'
        
    })
    //expect(endState.length).toBe(4)
    expect(endState[1].filter).toBe('completed')
})

test('correct removing', () =>{
    let todolistID1 = v1()
    let todolistID2 = v1()
    let startState: Array<TodolistDomainType> = [
        { id: todolistID1, title: 'what to learn', filter: 'all', addedDate: '', order: 0 },
        { id: todolistID2, title: 'what to buy', filter: 'all', addedDate: '', order: 0 },
        
    ]
    const action  = removeTodolistAC(todolistID1)

    const endState = TodolistsReducer(startState, action)

    expect(endState.length).toBe(1)
})

test('add todo', () => {
    let todolistID1 =v1()
    let todolistID2 =v1()
    let startState: Array<TodolistDomainType> = [
        { id: todolistID1, title: 'what to learn', filter: 'all', addedDate: '', order: 0 },
        { id: todolistID2, title: 'what to buy', filter: 'all', addedDate: '', order: 0 }, 
    ]
    let newTitle = 'greeting'
    const action = addTodolistAC(newTitle)
    const endState = TodolistsReducer(startState, action)
    expect(endState.length).toBe(3)
})

test('dispatch todo', () => {
    let startState: Array<TodolistDomainType> = [
        { id: 'todolistID1', title: 'what to learn', filter: 'all', addedDate: '', order: 0 },
        { id: 'todolistID2', title: 'what to buy', filter: 'all', addedDate: '', order: 0 }, 
    ]
    const action = setTodolistsAC(startState)
    const endState = TodolistsReducer([], action)
    expect(endState.length).toBe(2)
})