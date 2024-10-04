import React, { useState } from 'react';
import { useBox } from '@react-three/cannon';
import { useXREvent } from '@react-three/xr';

export function InteractiveCube(props) {
  const [color, setColor] = useState('blue');
  const [ref] = useBox(() => ({ mass: 1, position: props.position }));

  // Listening for selectstart events from the XR controller
  useXREvent('selectstart', (event) => {
    // Ensure we're comparing to the correct object
    if (event.target.intersectedObjects.includes(ref.current)) {
      setColor(color === 'blue' ? 'red' : 'blue');
    }
  });

  return (
    <mesh ref={ref} {...props} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
