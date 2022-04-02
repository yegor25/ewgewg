import { type } from "os";
import { title } from "process";
import React, { ChangeEvent, useState } from "react";

export type EditableType={
title: string
onChange:(newValue:string)=> void
}

const EditableSpan = React.memo( (props: EditableType) =>{

    
    const [newTitle, setNewTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)
    const activateViewMode = ()=> {
        setEditMode(false)
        props.onChange(newTitle)
    }
    const activateEditMode = ()=> setEditMode(true)
        
    
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    return editMode 
    ?<input value={newTitle} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
    } ) 

export default EditableSpan