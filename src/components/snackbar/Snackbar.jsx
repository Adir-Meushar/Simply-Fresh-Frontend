import { useContext } from 'react';
import { GeneralContext } from '../../App';
import './snackbar.css'

function Snackbar({ text }) {
    const { isDarkMode} = useContext(GeneralContext)

    return <div className={`snackbar ${isDarkMode ? 'dark' : ''}`}>{text}</div>;
}

export default Snackbar
