import React, { useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';
import './style.css';

const App = () => {

  const [rotationDegs, setRotationDegs] = useState([0,0,1]) // x, y, scale .degree values ranging from -X to +X
  const [shouldTransition, setShouldTransition] = useState(true)

  const onPointerEnter = e => {
    // Transition to starting place quickly
    setTimeout(()=> {
      // setShouldTransition(false)
    }, 200)
  }

  const onPointerLeave = e => {
    // Reset rotation and transition
    setTimeout(()=> {
      // setShouldTransition(true)
      setRotationDegs([0,0,1])
    }, 100)
  }

  const onPointerMove = e => {
    // When the pointer is dead centered in the card, both the X and Y rotate3d values need to equal 0.
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;  //y position within the element.
    const zeroPoint = { x: rect.width/2, y:  rect.height/2 }
    // -1 for on the left, +1 for the right multiplied by degrees (12)
    const yRotation = ((x - zeroPoint.x) / rect.width * 2) * 10; 
    const xRotation = ((zeroPoint.y - y) / rect.height * 2) * 12;
    // console.log('x: ', yRotation, 'y: ', xRotation)
    setRotationDegs([xRotation, yRotation, 1.05])    
  }

    return (
      <main>
        <div 
          className='card' 
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          style={{
              transform: `rotateX(${rotationDegs[0]}deg) rotateY(${rotationDegs[1]}deg) scale(${rotationDegs[2]})`, 
              transition: shouldTransition ? `transform 120ms ease`: 'none'}}
          >
          <p className='text'>Hover me</p>
        </div>
      </main>
    );
  
}

render(<App />, document.getElementById('root'));
