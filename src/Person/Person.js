import React from 'react';
// We can also import this CSS from the main App component.
//import './Person.css';
// We will use class modules in this version
import classes from './Person.module.css';
//import Radium from 'radium';
//import styled from 'styled-components';

// const StyledDiv = styled.div`
//     width: 60%;
//     margin: 16px auto;
//     border: 1px solid #eee;
//     box-shadow: 0 2px 3px #ccc;
//     padding: 16px;
//     text-align: center;
//     background: blue;

//     @media (min-width: 500px): {
//             width: 450px;
//     }
// `;

const person = (props) => {
    //const age = Math.floor(Math.random() * 30);
    // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // };
    if(Math.random() > 0.7) {
        throw new Error('Throwing error in Person function');
    }
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>I'm a {props.name}, and I'm {props.age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name}></input>
        </div>
    );


}

export default person;