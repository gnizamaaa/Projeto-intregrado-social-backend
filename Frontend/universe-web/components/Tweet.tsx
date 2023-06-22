import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack, BiLike } from 'react-icons/bi';
import dayjs from "dayjs"
import { TfiComments } from "react-icons/tfi";

interface HeaderProps {
    data: any;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
    return (
        <div className="border-y-[1px] border-neutral-800 p-2">
            <div className="items-center gap-2 mx-2">
                {/* TODO: Mudar Dps q arrumar usuario!!, pegar nick atraves do id */}
                <p className="text-sm">{data.userId}:</p>
                <p>{data.mensagem}</p>
                <p className="text-xs text-end">Postado em: {data.releaseDate}</p>
            </div>
            <div className="p-2">
                <button className="p-1">
                    <TfiComments size={20} color="white" />
                </button>
                {/* TODO: Fazer esse botao mudar quando da like, acho q onClick resolve,
                 mas to sem tempo agr, BiLike tem BiSolidLike*/}
                <button className="p-1">
                    <BiLike size={20} color="white" id="likeButton" />
                </button>
            </div>
        </div>
    );
}
export default Header;