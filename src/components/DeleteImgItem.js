import { FaCheckCircle } from 'react-icons/fa'
import { useState } from 'react';

const DeleteImgItem = ({ url, toggleDeleteImg }) => {

    const [redClass, setRedClass] = useState("black");

    const toggleHandler = () => {
        if (redClass == "black") {
            toggleDeleteImg(url);
            setRedClass("red");
        } else {
            toggleDeleteImg(url);
            setRedClass("black");
        }
    }

    return (
        <div className='DeleteImgItem' style={{ "position": "relative" }} onClick={toggleHandler} >
            <img key={url} src={url} alt="img" style={{ "width": "80px", "height": "100px", "filter": "brightness(50%)" }} />
            <FaCheckCircle className={redClass} style={{ "position": "absolute", "top": "40px", "left": "30px" }} />
        </div>
    );
}

export default DeleteImgItem;