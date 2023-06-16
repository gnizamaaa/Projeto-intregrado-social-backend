import { useRouter } from "next/router"
import { FaBroom } from "react-icons/fa";

const SidebarTweet = () => {
    const router = useRouter();

    return (
        <div onClick={() => router.push('/')}>
            <div className="mt-3 lg:hidden rounded-full h-14 w-14 p-4 flex 
            items-center justify-center bg-sky-500 hover:bg-opacity-80 
            transition cursor-pointer">
                <FaBroom size={25} color="white" />
            </div>
            <div className="mt-3 hidden lg:flex rounded-full gap-4 p-4 
            items-center justify-center bg-sky-500 hover:bg-opacity-80 
            transition cursor-pointer">
                <FaBroom size={25} color="white" />
                <p className="lg:block text-white text-xl">
                    Publique!
                </p>
            </div>
        </div>

    )
}

export default SidebarTweet;