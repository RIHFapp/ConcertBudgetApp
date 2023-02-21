import React, { useState, useEffect } from 'react';
const BgOverlay = () => {
   const [position, setPosition] = useState({ x: 0, y: 0 });
   
   useEffect(() => {
      const updatePosition = e => {
        setTimeout(() => {
          setPosition({ x: e.clientX, y: e.clientY });
        }, 100);
      };
      window.addEventListener('mousemove', updatePosition);
      return () => window.removeEventListener('mousemove', updatePosition);
    }, []);
   return (
        <>
        <div className='overlay' style={{ position: 'fixed', left: position.x, top: position.y }}>
        </div>
        <div className='blur'></div>
        </>
   )
}


export default BgOverlay;