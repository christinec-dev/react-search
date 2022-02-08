import { useState, useRef, useEffect } from "react";

const useOutsideClick = () => {
    //hide the suggestion box
    const [isVisible, setIsVisible] = useState(false);

    //persists values between renders
    //if there are multiple input fields, then each input field will have its own suggestion box and hiding and showing functionality
    const ref = useRef();

    //we want to call the setIsVisible function only if the ref for the suggestion box is available and not every time we click on the page
    const handleOutsideClick = () => {
        if (ref.current) {
            setIsVisible(false)
        }
    };

    //calls the handleOutsideClick function
    useEffect(() =>{
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return [ref, isVisible, setIsVisible];
}


export default useOutsideClick;