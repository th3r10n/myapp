// This version of the app uses React hooks. The hooks come from the react module and their names start with  "use"
// e.g useState
import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
// We can import this CSS here as follows, or we can import it in the Person component.
//import './Person/Person.css'
// Always capitalize the first letter of a Component's name. 
import Person from './Person/Person';


// If the function name is not in capital letters i.e. "App", React will throw this message while using the useState hook:
// React Hook "useState" is called in function "app" which is neither a React function component or a custom React Hook function
const App = props => {
  // The state property that we used in the Component version of the app is now passed as an argument to the state 
  // function.
  // useState always returns an Array with exactly 2 elements. The array[0] element is the state itself whereas
  // the array[1] is the function used to mutate the state.
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Max', age: 30 },
      { name: 'Elver', age: 46 }
    ],
    otherProperty: 'Test',
    showPersons: false
  });

  const switchNameHandler = (newName, newAge) => {
    console.log("switchNameHandler was clicked");
    // setPersonsState will not merge but instead it will replace the "state" with its argument.
    setPersonsState({
      persons: [
        { name: newName, age: newAge },
        { name: 'Elver', age: 200 }
      ]
    });
  }

  const nameChangeHandler = (event) => {
    console.log("nameChangeHandler was called");
    setPersonsState({
      persons: [
        { name: event.target.value, age: 66 },
        { name: 'Elver', age: 77 }
      ]
    });
  }

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  }

  const togglePersonsHandler = () => {
    const doesShow = personsState.showPersons;
    // In this case we can't just pass {showPersons: !doesShow} as argument to setPersonsState because setPersonsState will overwrite
    // the whole state with its arguments. Instead we need to use the spread operator to split the previous state to merge the changes.
    // useState in the class based Components will merge automatically the new state so with that hook we can use:
    // useState({showPersons: !doesShow})
    setPersonsState(
      {...personsState,
         showPersons: !doesShow
      });
  }

  let persons = null;
  
  if(personsState.showPersons) {
    persons = <div>
    <Person age={personsState.persons[0].age} name={personsState.persons[0].name} click={switchNameHandler.bind(this, "Joto", 777)} />
    <Person age={personsState.persons[1].age} name={personsState.persons[1].name} changed={nameChangeHandler}>kiobas joto</Person>
  </div>;
  }
  return (
    // This is JSX syntax...
    // The attribute of the "button" is named "onClick" in JSX instead of "onclick" as in normal HTML.
    <div className="App">
      <h1>Hi I'm a React App</h1>
      <button
        style={style}
        onClick={switchNameHandler.bind(this, "Elver", 666)}>Click</button>
      <br/>
      <button
        style={style}
        onClick={togglePersonsHandler}>Toggle</button>  
      
        {persons}

    </div>
  );

}

export default App;
