import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';


const Sidebar = () => {
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
        },
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
                    />
                ))}
            </div>
        </div>
    );
}
export default Sidebar;