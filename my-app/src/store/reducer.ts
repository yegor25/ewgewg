import { type } from "os"

export const sum = (num1:number, num2:number) =>{
    return num1 + num2
}
export const mult = (a:number, b: number) => a*b
export const sub = (a:number, b: number) => a-b
export const div = (a:number, b: number) => a/b


export type ActionType = {
    type: 'SUM' | 'MULT'
    number: number
}

export const calculator = (state: number, action: ActionType) => {
    switch (action.type) {
        case 'SUM':
            return state + action.number
        case 'MULT':
            return state * action.number
        default:
            return state
    }
}