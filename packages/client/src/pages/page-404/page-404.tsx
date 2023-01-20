import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Page404: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/', { replace: true });
    }, []);

    return <p>dsa</p>;
};
