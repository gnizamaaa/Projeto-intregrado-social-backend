import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

// Componente de layout que define uma estrutura básica de página com uma barra lateral e área de conteúdo
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full">
                    <Sidebar />
                    <div className="col-span-3 lg:col-span-3 border-x-[1px] border-neutral-800">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;