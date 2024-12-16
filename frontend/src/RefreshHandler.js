import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();

    useEffect(() => {
        // Check if the user has a token in localStorage
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
        }
    }, [location, setIsAuthenticated]);

    return null;
}

export default RefrshHandler;
