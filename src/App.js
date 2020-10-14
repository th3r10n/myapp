// This version of the app uses React hooks. The hooks come from the react module and their names start with  "use"
// e.g useState
import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
// We can import this CSS here as follows, or we can import it in the Person component.
//import './Person/Person.css'
// Always capitalize the first letter of a Component's name. 
import Person from './Person/Person';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';
//import Radium, { StyleRoot } from 'radium';
//import styled from 'styled-components';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';


// If the function name is not in capital letters i.e. "App", React will throw this message while using the useState hook:
// React Hook "useState" is called in function "app" which is neither a React function component or a custom React Hook function
const App = props => {
  // The state property that we used in the Component version of the app is now passed as an argument to the state 
  // function.
  // useState always returns an Array with exactly 2 elements. The array[0] element is the state itself whereas
  // the array[1] is the function used to mutate the state.
  const [personsState, setPersonsState] = useState({
    persons: [
      { id: 1, name: 'Max', age: 30 },
      { id: 2, name: 'Elver', age: 46 }
    ],
    otherProperty: 'Test',
    showPersons: false,
    textLenght: 0,
    charComponentArray: null,
    textArray: []

  });

  const switchNameHandler = (newName, newAge) => {
    console.log("switchNameHandler was clicked");
    // setPersonsState will not merge but instead it will replace the "state" with its argument.
    setPersonsState({
      persons: [
        //{ name: newName, age: newAge },
        { name: 'Elver', age: 200 }
      ]
    });
  }

  const nameChangeHandler = (event, id) => {
    console.log("nameChangeHandler was called");
    // The argument to find is a function that will be applied to each element of the persons Array.
    const personIndex = personsState.persons.findIndex(p => { return p.id === id; });

    // Don't mutate the original state. Make a copy of the object first.
    const person = { ...personsState.persons[personIndex] };

    // These expressions are equivalent to the previous idiom:
    // const personIndex  = personsState.persons.findIndex(p => {return p.id === id;});
    // const person = Object.assign({}, personsState.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...personsState.persons];
    persons[personIndex] = person;

    setPersonsState({ ...personsState, persons });
  }

  const deletePersonHandler = (personIndex) => {
    // When updating state, you should make sure to not overwrite the original state.
    // This approach mutates the original "persons" state.
    // const persons = personsState.persons;
    // so we make a copy of the persons object first either by slicing the original Array:
    //const persons = personsState.persons.slice();
    // or using the spread operator.
    // Always mute the state in an immutable fashion.
    const persons = [...personsState.persons]
    persons.splice(personIndex, 1);
    setPersonsState({ ...personsState, persons });
  }

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer',
    // We can use the Radium selectors as such:
    ':hover': {
      backgroundColor: 'red'
    }
  }

  // We use a String which is a symple CSS. See difference with 'style' constant above.
  // const StyledButton = styled.button`
  //   background-color: ${props => props.alt ? 'red' :'green'};
  //   font: inherit;
  //   border: 1px solid blue;
  //   padding: 8px;
  //   cursor: pointer;
  //   // We can use the Radium selectors as such:
  //   &:hover {
  //     background-color: red;
  //   }
  // `;

  const togglePersonsHandler = () => {
    const doesShow = personsState.showPersons;
    // In this case we can't just pass {showPersons: !doesShow} as argument to setPersonsState because setPersonsState will overwrite
    // the whole state with its arguments. Instead we need to use the spread operator to split the previous state to merge the changes.
    // useState in the class based Components will merge automatically the new state so with that hook we can use:
    // useState({showPersons: !doesShow})
    setPersonsState(
      {
        ...personsState,
        showPersons: !doesShow
      });
  }

  const textChangeHandler = (event) => {
    console.log("textChangeHandler was called");
    let textLength = { ...personsState.textLenght };

    let text = { ...personsState.text };

    let charComponentArray = { ...personsState.charComponentArray };
    // These expressions are equivalent to the previous idiom:
    // const personIndex  = personsState.persons.findIndex(p => {return p.id === id;});
    // const person = Object.assign({}, personsState.persons[personIndex]);

    textLength = event.target.value.length;

    //setPersonsState({ ...personsState, textLength });

    text = event.target.value;
    console.log("Text:" + text);

    let textArray = { ...personsState.textArray };
    textArray = []
    console.log("textArray1: " + textArray.toString());
    for(let index in text) {
      console.log("idx: " + index)
      textArray.push(text.charAt(index))
    }
    console.log("textArray2: " + textArray.toString())

//     charComponentArray = <div>
//       {textArray.map((letter, index) => {
//         console.log('letter: ' + letter)
//         console.log('index: ' + index)
//         return <CharComponent
//           click={() => deleteCharComponentHandler(index)}
//           value={letter}
//           key={index}
//         />
//       })}
// </div>;

setPersonsState({ ...personsState, textLength, charComponentArray, textArray });
    // charComponentArray = <div>
    //   {text.map((letter, index) => {
    //     return <CharComponent
    //       click={() => deleteCharComponentHandler(index)}
    //       value={letter}
    //       key={index}
    //     />
    //   })}

    //</div>

  };

  const deleteCharComponentHandler = (componentIndex) => {
    // When updating state, you should make sure to not overwrite the original state.
    // This approach mutates the original "persons" state.
    // const persons = personsState.persons;
    // so we make a copy of the persons object first either by slicing the original Array:
    //const persons = personsState.persons.slice();
    // or using the spread operator.
    // Always mute the state in an immutable fashion.
    // const persons = [...personsState.persons]
    // persons.splice(personIndex, 1);
    // setPersonsState({...personsState, persons});
    ////
    // The argument to find is a function that will be applied to each element of the persons Array.
    const textArrayTemp = [...personsState.textArray]
    const textArray = []
    textArrayTemp.forEach((letter, index) =>{
      if(componentIndex !== index) {
        textArray.push(letter);
      }
    });
    console.log('textArray: ' + textArray);



    // Don't mutate the original state. Make a copy of the object first.
    //const person = { ...personsState.persons[personIndex] };

    // These expressions are equivalent to the previous idiom:
    // const personIndex  = personsState.persons.findIndex(p => {return p.id === id;});
    // const person = Object.assign({}, personsState.persons[personIndex]);

    //person.name = event.target.value;

    //const persons = [...personsState.persons];
    //persons[personIndex] = person;

    setPersonsState({ ...personsState, textArray });
    ////
    console.log('CharComponent was clicked')
  }

  //let charComponentArray = null;
  let persons = null;

  if (personsState.showPersons) {
    // Each child in a list should have a unique "key" prop.
    persons = <div>
      {personsState.persons.map((person, index) => {
        return <ErrorBoundary key={person.id}><Person
          click={() => deletePersonHandler(index)}
          name={person.name}
          age={person.age}
          
          changed={(event) => nameChangeHandler(event, person.id)} /></ErrorBoundary>
      })}

    </div>;
  }
  return (
    // This is JSX syntax...
    // The attribute of the "button" is named "onClick" in JSX instead of "onclick" as in normal HTML.
    // To get rid of: 
    // Uncaught Error: To use plugins requiring `addCSS` (e.g. keyframes, media queries), please wrap your application in the StyleRoot component. Component name: `Object`.
    // wrap the returned component in the StyleRoot element.
    // Removed <StyledRoot> We will use styled components instead
    <div className="App">
      <h1>Hi I'm a React App</h1>
     <button 
        onClick={switchNameHandler.bind(this, "Elver", 666)}>Click
        </button>
      <br />
      <button key='button2'
        style={style}
        onClick={togglePersonsHandler}>Toggle</button>

      {persons}
      <br />
      <input type="text" onChange={(event) => textChangeHandler(event)} value={personsState.textArray.join('')}/>
      <br />
      <p id="length">{personsState.textLength}</p>
      <ValidationComponent inputLength={personsState.textLength} />
      <CharComponent />
      {personsState.textArray.map((letter, index) => {
        console.log('letter: ' + letter)
        console.log('index: ' + index)
        return <CharComponent
          click={() => deleteCharComponentHandler(index)}
          value={letter}
          key={index}
        />
      })}
    </div>
    //</StyleRoot>
  );

}
// To use Radium we use a high order component. We do this by wrapping a component inside another component. We can use this in 
// class and functional components.
// To avoid:
// Uncaught Error: To use plugins requiring `addCSS` (e.g. keyframes, media queries), please wrap your application in the StyleRoot component. Component name: `Object`.
// we need to use wrap the main application with the StyleRoot element.

export default App;
