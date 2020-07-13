import React from 'react';
// We can also import this CSS from the main App component.
import './Person.css'

const person = (props) => {
    //const age = Math.floor(Math.random() * 30);
return (
    <div className="Person">
        <p onClick={props.click}>I'm a {props.name}, and I'm {props.age} years old.</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.changed} value={props.name}></input>
    </div>
);

    
  }
  
  export default person;