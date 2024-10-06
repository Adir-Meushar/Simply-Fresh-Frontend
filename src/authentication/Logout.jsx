import { useContext } from 'react';
import { GeneralContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Logout({handleClick}) {
    const { setUser, user, setLoader,showToastMessage } = useContext(GeneralContext)
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        setLoader(true)
        showToastMessage(`Until Next Time ${user.firstName} 😁`,'#2196F3')
        setUser(null)
        navigate('/')
        setTimeout(() => {
            setLoader(false)
        }, 500)
        handleClick();
    }

    return (
        <>
            <div onClick={logout} className="icon icon-collapse"><i className="fa fa-sign-in"></i></div>
        </>
    )
}

export default Logout;
