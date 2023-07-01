import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import dayjs from "dayjs"
import { TfiComments } from "react-icons/tfi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useCookies } from "react-cookie";

interface HeaderProps {
    data: any;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
    const [liked, setLiked] = useState(false);
    const [cookies] = useCookies(["userId"]);

    const handleLike = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                userId: cookies.userId,
                tweetId: data.id
            }),
        };

        fetch("http://localhost:8080/api/v1/tweets/liked", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });

        setLiked(true);
    };
    return (
        <div className="border-y-[1px] border-neutral-800 p-2">
            <div className="items-center gap-2 mx-2">
                {/* TODO: Mudar Dps q arrumar usuario!!, pegar nick atraves do id */}
                <p className="text-sm">{data.pseudonimo}:</p>
                <p>{data.mensagem}</p>
                <p className="text-xs text-end">Postado em: {data.releaseDate}</p>
            </div>
            <div className="p-2">
                <button className="p-1">
                    <TfiComments size={20} color="white" />
                </button>
                {/* TODO: Fazer esse botao mudar quando da like, acho q onClick resolve,
                 mas to sem tempo agr, BiLike tem BiSolidLike*/}
                <button onClick={handleLike}> {
                    !liked && (
                        <AiOutlineLike size={20} color="white" id="likeButton" />
                    )
                } </button>
                <button> {
                    liked && (
                        <AiFillLike size={20} color="white" id="likeButton" />
                    )
                } </button>
            </div>
        </div>
    );
}
export default Header;