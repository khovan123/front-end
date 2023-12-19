import { useState,memo, useMemo, useEffect, useCallback } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from './CounterHistory.jsx';


function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter=memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);
  
  const [counterChanges,setCounterChanges]=useState([{
    value:initialCount, id: Math.random()*1000
  }]);
  
 
  const initialCountIsPrime = isPrime(counterChanges[0].value);
  
  const handleDecrement= useMemo(()=>function handleDecrement() {
   setCounterChanges((prevCounter)=>[{value:prevCounter[0].value-1, id:Math.random()*1000},...prevCounter])
  },[])

  const handleIncrement = useMemo( ()=> function handleIncrement() {
        
        setCounterChanges((prevCounter)=>[{value:prevCounter[0].value +1,id:Math.random()*1000},...prevCounter])
    },[])
  
  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{counterChanges[0].value  }</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counterChanges[0].value} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges}/>
    </section>
  );
})
export default Counter;