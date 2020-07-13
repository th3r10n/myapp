import React from 'react';
// We can also import this CSS from the main App component.
import './CharComponent.css'

const charComponent = (props) => {
    //const age = Math.floor(Math.random() * 30);
    
return (
    <div className="CharComponent">
        <p>{props.value}</p>
    </div>
);

    
  }
  
  export default charComponent;