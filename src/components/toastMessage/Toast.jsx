import './toast.css'

function Toast({ message, visible, bgColor }) {
    return (
      <div
        className={`toast ${visible ? 'show' : ''}`}
        style={{ backgroundColor: bgColor }} 
      >
        {message}
      </div>
    );
  }
  
  export default Toast;
  