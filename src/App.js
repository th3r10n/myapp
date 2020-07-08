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
      { id: 1, name: 'Max', age: 30 },
      { id: 2, name: 'Elver', age: 46 }
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

  const nameChangeHandler = (event, id) => {
    console.log("nameChangeHandler was called");
    // The argument to find is a function that will be applied to each element of the persons Array.
    const personIndex = personsState.persons.findIndex(p => {return p.id === id;});

    // Don't mutate the original state. Make a copy of the object first.
    const person = {...personsState.persons[personIndex]};

    // These expressions are equivalent to the previous idiom:
    // const personIndex  = personsState.persons.findIndex(p => {return p.id === id;});
    // const person = Object.assign({}, personsState.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...personsState.persons];
    persons[personIndex] = person;

    setPersonsState({...personsState, persons});
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
    setPersonsState({...personsState, persons});
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
    // Each child in a list should have a unique "key" prop.
    persons = <div>
      {personsState.persons.map((person, index) => {
         return <Person 
         click={() => deletePersonHandler(index)}
         name={person.name} 
         age={person.age}
         key={person.id}
         changed={(event) => nameChangeHandler(event, person.id)}/>
      })}
    
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
