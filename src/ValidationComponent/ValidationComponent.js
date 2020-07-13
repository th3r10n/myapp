import React from 'react';
// We can also import this CSS from the main App component.
//import './Person.css'

const validationComponent = (props) => {
    //const age = Math.floor(Math.random() * 30);
    let validationMessage = '';
    if(props.inputLength < 5) {
        validationMessage = 'Text to short'
    }else if(props.inputLength >= 5) {
        validationMessage = 'Text long enough'
    }
return (
    <div className="ValidationComponent">
        <p>{validationMessage}</p>
    </div>
);

    
  }
  
  export default validationComponent;