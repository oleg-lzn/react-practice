import React, { FormEvent, FormEventHandler } from "react";
import { useReducer } from "react"

type Action = {
    type: 'increment age' | 'decrement age' | 'reset age';
}

type ActionWithPayload = {
    type: 'change name',
    payload: string
}

type User = {
    age: number,
    name: string
}

    const INCREMENT = 'increment age';
    const DECREMENT = 'decrement age';
    const RESET = 'reset age';
    const CHANGENAME = 'change name';

function reducer (state: User, action: Action | ActionWithPayload) {

    switch (action.type) {
        case INCREMENT : 
        return {
            name: state.name,
            age: state.age + 1
        };
        case DECREMENT : 
        return {
            name: state.name,
            age: state.age > 0 ? state.age - 1: 0
        }
        case RESET : 
        return {
            name: state.name,
            age: 0
        };
        case CHANGENAME : 
        return {
            age: state.age,
            name: action.payload,
        };
        default:  throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const initialState = {age: 31, name: 'Taylor'}

export const ComponentWithReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState) // optional 3rd parameter - function for making the initial state 

    const changeName = (e:React.ChangeEvent<HTMLInputElement>)  =>
        dispatch({
            type : CHANGENAME,
            payload: e.target.value
        })
       
    const incrementAge = () => dispatch({ type: INCREMENT });
    const decrementAge = () => dispatch({ type: DECREMENT });
    const resetAge = () => dispatch({ type: RESET });
    
return (
    <div className="reducer__div">
        <button className="reducer__button" onClick = {incrementAge}>Get Older</button>
        <button className="reducer__button" onClick = {decrementAge}>Get Younger</button>
        <button className="reducer__button" onClick = {resetAge}>Reset</button>
        <input type="text" className="change_name" value = {state.name} onChange ={changeName} />
        <p>Hello! You are {state.age}.</p>
        <p className="name">{state.name}</p>
    </div>
)

}

export default ComponentWithReducer;