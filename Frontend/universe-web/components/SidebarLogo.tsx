import { useRouter } from "next/router";
import { Bs0CircleFill } from "react-icons/bs";

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
            <Bs0CircleFill size={25} color="white" />
        </div>
    );
}
export default SidebarLogo;