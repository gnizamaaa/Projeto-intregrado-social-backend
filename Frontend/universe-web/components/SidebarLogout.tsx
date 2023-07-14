import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import SidebarItem from './SidebarItem';
import { AiOutlineLogout } from 'react-icons/ai';

const SidebarLogout = () => {
    const [showButton, setShowButton] = useState(true);
    const [cookies, setCookie] = useCookies(["userId"]);
    const [, setUsername] = useCookies(["username"]);

    // Efeito para verificar o estado do cookie e definir a visibilidade do botão de logout
    useEffect(() => {
        const cookieValue = cookies.userId;
        if (!cookieValue || cookieValue === 'undefined') {
            setShowButton(false);
        } else
            setShowButton(true);

    }, [cookies.userId]);

    // Função para lidar com o logout
    const handleLogout = () => {
        setCookie("userId", undefined);
        setUsername('username', undefined);
        setShowButton(false);
    };

    return (
        <div> {
            showButton && (
                <SidebarItem label={'Logout'}
                    icon={AiOutlineLogout}
                    onclick={handleLogout} />
            )
        } </div>
    );
};

export default SidebarLogout;
