import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import SidebarLogo from './SidebarLogo';

const SidebarLogout = () => {
    const [showButton, setShowButton] = useState(true);
    const [cookies, setCookie] = useCookies(["userId"]);


    useEffect(() => {
        // Check if the cookie is set
        const cookieValue = cookies.userId;
        if (cookieValue === 'undefined') {
            setShowButton(false); // Cookie is set, hide the button
        }
    }, [cookies.userId]);

    const handleButtonClick = () => {
        // Perform actions when the button is clicked
        // ...
        // Set the cookie
        setCookie("userId", undefined);
        setShowButton(false); // Hide the button after setting the cookie
    };

    return (
        <div>
            {showButton && (
                <button onClick={handleButtonClick}>
                    Log out
                </button>
            )}
        </div>
    );
};

export default SidebarLogout;
