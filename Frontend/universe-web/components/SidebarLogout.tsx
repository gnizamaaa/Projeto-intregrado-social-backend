import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import SidebarItem from './SidebarItem';
import { AiOutlineLogout } from 'react-icons/ai';

const SidebarLogout = () => {
    const [showButton, setShowButton] = useState(true);
    const [cookies, setCookie] = useCookies(["userId"]);
    const [, setUsername] = useCookies(["username"]);



    useEffect(() => {
        // Checando o valor do cookie e setando a visibilidade do botao
        // para falsa quando o cookie nao esta definido e verdadeira
        // para quando possui um valor valido
        const cookieValue = cookies.userId;
        if (!cookieValue||cookieValue === 'undefined') {
            setShowButton(false);
        } else
            setShowButton(true);

    }, [cookies.userId]);

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
