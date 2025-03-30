import { useReducer } from "react";
import React from "react";

type Action = {
    type: 'increment age' | 'decrement age' | 'reset age' | 'set age'
}

type ActionWithPayload = {
    type: 'change name' | 'set age',
    payload: string
}

type User = {
    age: number,
    name: string
}

// action constants

    const INCREMENT = 'increment age';
    const DECREMENT = 'decrement age';
    const RESET = 'reset age';
    const SET = 'set age';
    const CHANGENAME = 'change name';


// reducer
function reducer (state: User, action: Action | ActionWithPayload) {

    switch (action.type) {
        case INCREMENT : 
        return {
            ...state,
            age: state.age + 1
        };
        case DECREMENT : 
        return {
            ...state,
            age: state.age > 0 ? state.age - 1: 0
        }
        case RESET : 
        return {
            ...state,
            age: 0
        };
        case SET : 
        return {
            ...state,
            age: action.payload
        };
        case CHANGENAME : 
        return {
           ...state,
            name: action.payload,
        };
        default: 
        return initialState;
    }
}

const initialState = {age: 31, name: 'Taylor'}

export const ComponentWithReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState) // optional 3rd parameter - function for making the initial state 

    // action creators

    const incrementAge = () => dispatch({ type: INCREMENT });
    const decrementAge = () => dispatch({ type: DECREMENT });
    const resetAge = () => dispatch({ type: RESET });
    const setAge = (e:React.ChangeEvent<HTMLInputElement>) => dispatch({ type: SET, payload: e.target.value });
    const changeName = (e:React.ChangeEvent<HTMLInputElement>) => dispatch({ type : CHANGENAME, payload: e.target.value })
    
return (
    <div className="reducer__div">
        <button className="reducer__button" onClick = {incrementAge}>Get Older</button>
        <button className="reducer__button" onClick = {decrementAge}>Get Younger</button>
        <button className="reducer__button" onClick = {resetAge}>Reset</button>
        <input type="text" className="change_name" value = {state.name} onChange ={changeName} />
        <input type="text" className="set_age" value = {state.age} onChange ={setAge} />
        <p>Hello! You are {state.age}.</p>
        <p className="name">{state.name}</p>
    </div>
)

}

export default ComponentWithReducer;