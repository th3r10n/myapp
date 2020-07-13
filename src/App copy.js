import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
// Always capitalize the first letter of a Component's name. 
import Person from './Person/Person';

class App extends Component {
  // The "state" property is only available in sub-classes of Component.
  // Changing the "state" property causes React to re-render the page. This behavior is only applicable to this property.
  state = {
    persons: [
      { name: 'Max', age: 30 },
      { name: 'Elver', age: 46 }
    ],
    otherProperty: 'Test'
  }
  // By convention, event handlers usually have the suffix "handler" added to them.
  // Arrow => syntax for functions allows to use the "this" keyword to reference class properties inside the functions.
  switchNameHandler = () => {
    console.log("Was clicked");
    // The following line doesn't work. The state cannot be mutated directly. You have to use the setState() function instead.
    //this.state.persons[0].name = "Turi";
    // setState will only modify the properties we pass as arguments and it will leave the rest untouched.
    this.setState({ persons: [
      { name: 'Max', age: 100 },
      { name: 'Elver', age: 200 }
    ] });
  }

  // If "state" changes or the "props" of a component change, React will call the "render" to render the DOM.
  render() {
    return (
      // This is JSX syntax...
      // The attribute of the "button" is named "onClick" in JSX instead of "onclick" as in normal HTML.
      <div className="App">
        <h1>Hi I'm a React App</h1>
        <button onClick={ this.switchNameHandler }>Click</button>
        <Person age={this.state.persons[1].age} />
        <Person age={this.state.persons[0].age}>kiobas</Person>
      </div>
    );
  }
  //...that in the ends compiles to the next statement and that is why we import React:
  //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now')); 
}

export default App;
