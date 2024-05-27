import './centerdLayout.css';

const CenteredLayout = ({ children }) => {
  return (
    <div className="centered-container">
      {children}
    </div>
  );
};

export default CenteredLayout;