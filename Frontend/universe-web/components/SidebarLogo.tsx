import { useRouter } from "next/router";
import { FaUniversity } from "react-icons/fa";

const SidebarLogo = () => {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push('/')}
            className="
        rounded-full
        h-15 w-14 p-4 flex items-center
        justify-center 
        hover:bg-blue-300 hover:bg-opacity-10
        cursor-pointer
        transition">
            {/* TODO: Mudar aqui para o icone da rede futuramente */}
            <FaUniversity size={25} color="white" />
        </div>
    );
}
export default SidebarLogo;