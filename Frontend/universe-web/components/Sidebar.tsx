import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { AiOutlineLogin } from "react-icons/ai";
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweet from './SidebarTweet';
import LoginModal from './LoginModal';
import { render } from 'react-dom';
import { useState } from 'react';


const Sidebar = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const itens = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill
        },
        {
            label: 'Profile',
            href: '/users/123',
            icon: FaUser
        }, {
            label: 'Login',
            href: '',
            icon: AiOutlineLogin,
            onclick: openModal
        }
    ]


    return (
        <div className='col-span-1 h-full pr-4 nd:pr-6'>
            <div className='flex flex-col items-end space-y-2 lg:w-[230px]'>
                <SidebarLogo />
                {itens.map((item) => (
                    <SidebarItem
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        onclick={item.onclick}
                    />
                ))}
                <SidebarTweet />
            </div>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}
export default Sidebar;