import React, { ChangeEvent, useState } from "react";
export type ItemFormType = {
    addItem : (newTitle:string, TodoListID:string) => void
    id:string
}
  export const AddItemForm = React.memo( (props: ItemFormType) =>{
    console.log('add item called');
    
    const [error, setError] = useState(false)
    const errorMessage = error === true ? 'Reqired title' : "" 
    const [newTask, setNewTask] = useState('')
    const addNewtask = ()=>{
        let trimmedTask = newTask.trim()
        console.log('new task', trimmedTask)
        if (trimmedTask){
            console.log('in if')
        props.addItem(trimmedTask,props.id)
        setNewTask('')
        setError(false)
        }else{
            setError(true)
        }
    }
    return(
        <div>
<input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=>{setNewTask(e.currentTarget.value)}}  value={newTask}/>
             <button onClick= {  addNewtask }>+</button>
             <div>{errorMessage}</div>
             </div>
    )
} ) 