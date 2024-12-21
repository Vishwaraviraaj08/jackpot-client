import './overlay.css'
import {useEffect} from "react";


export default  function Overlay({ isOpen, onClose, children }) {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isOpen]);


    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === "overlay") {
            onClose();
        }
    };

    return (
        <div className="overlay" onClick={handleOverlayClick}>
            <div className="overlay-content animate-pop">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}