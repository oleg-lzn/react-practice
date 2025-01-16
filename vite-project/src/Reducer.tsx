import React from "react";
import { useReducer } from "react"

function reducer (state: {age: number, name: string}, action: {type: any}) {

    switch (action.type) {
        case 'increment age' : 
        return {
            name: state.name,
            age: state.age + 1
        };
        case 'decrement age' : 
        return {
            name: state.name,
            age: state.age > 0 ? state.age - 1: 0
        }
        case 'reset age' : 
        return {
            name: state.name,
            age: 0
        };
        case 'change name' : 
        return {
            age: state.age,
            name: action.payload,
        };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const initialState = {age: 31, name: 'Taylor'}

export const ComponentWithReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState) // optional 3rd parameter - function for making the initial state 

    function changeName (e) {
        dispatch({
            type : 'change name',
            payload: e.target.value
        })
    }
    
return (
    <div className="reducer__div">
        <button className="reducer__button" onClick = {() => {
            dispatch({type: "increment age"})
            }}>Get Older</button>
        <button className="reducer__button" onClick = {() => {
            dispatch({type: 'decrement age'})
            }}>Get Younger</button>
        <button className="reducer__button" onClick = {() => {
            dispatch({type: 'reset age'})
        }}>Reset</button>
        <p>Hello! You are {state.age}.</p>
        <input type="text" className="change_name" value = {state.name} onChange ={changeName} />
        <p className="name">{state.name}</p>
    </div>
)

}

export default ComponentWithReducer;