// Counter.js
import './counter.css';

function Counter({count,onChange}) {
   
  const handleIncrement = (ev) => {
    ev.stopPropagation();
    onChange(1); // Increment count for the specific item
  };

  const handleDecrement = (ev) => {
    ev.stopPropagation();
    if (count > 0) {
      onChange(-1); // Decrement count for the specific item
    }
  };

  return (
    <div className="counter">
      <button className="counter-btn" onClick={handleDecrement}>-</button>
      <p>{count}</p>
      <button className="counter-btn" onClick={handleIncrement}>+</button>
    </div>
  );
}

export default Counter;
