import { PiMagnifyingGlassBold } from "react-icons/pi";
import { PiSmileyDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function Empty({message,cartModal}) {

    const navigate = useNavigate();

    const backToStore=()=>{
      if(cartModal){
        cartModal(false)
      }
      navigate('/')
    }
    
    return (
        <div className='empty-area'>
        <div className="custom-icon">
            <PiMagnifyingGlassBold className="magnifying-glass" />
            <PiSmileyDuotone className="sad-smiley" />
        </div>
        <p>{message} </p>
        <button className='back-to-shop-btn' onClick={backToStore }>Start shopping now!</button>

    </div>
    )
}

export default Empty
