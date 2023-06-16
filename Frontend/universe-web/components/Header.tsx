import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from 'react-icons/bi';

interface HeaderProps {
    label: string;
    showBackArrow?: boolean;
}

// Com BackArrow:
// <Header showBackArrow label="Label"/>
// Sem BackArrow:
// <Header label="Label"/>

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
    const router = useRouter();
    const voltapag = useCallback(() => { router.back() }, [router]);

    return (
        <div className="border-y-[1px] border-neutral-800 p-2">
            <div className=" flex flex-row items-center gap-2 mx-2">
                {
                    showBackArrow && (<BiArrowBack onClick={voltapag} color="white" size={20} className="cursor-pointer hover:opacity-80 transition " />)
                }
                <h1 className="text-white text-xl font-semibold">
                    {label}
                </h1>
            </div>
        </div>
    );
}
export default Header;