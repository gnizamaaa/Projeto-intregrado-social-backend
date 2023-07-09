import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import dayjs from "dayjs"
import { TfiComments } from "react-icons/tfi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useCookies } from "react-cookie";
//import TweetModal from "./TweetModal"; //Dependencia circular, n da

interface HeaderProps {
    data: any;
    openModal?: (tweetbase: any) => void;
    closeModal?: () => void;
    modalOpen?: boolean;
    onClick?: () => void;
}



const Header: React.FC<HeaderProps> = ({ data, openModal, closeModal, modalOpen, onClick }) => {
    const [liked, setLiked] = useState(false);
    const [cookies] = useCookies(["userId"]);
    const length = data.liked.length;

    const handleComment = () => {
        if (openModal)
            openModal(data);
    }

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
                <p className="text-sm">{data.pseudonimo}:</p>
                <p>{data.mensagem}</p>
                <p className="text-xs text-end">Postado em: {data.releaseDate}</p>
            </div>
            <div className="p-2 flex items-center">
                <button className="p-1">
                    <TfiComments size={20} color="white" onClick={handleComment} />
                </button>
                <div className="flex items-center">
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
                    <p className="ml-1 text-sm">{length}</p>
                </div>
            </div>
        </div>
    );
}
export default Header;