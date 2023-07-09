import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FaBroom } from "react-icons/fa";
import TextareaAutosize from 'react-textarea-autosize';
import Tweet from "./Tweet";


interface TweetModalProps {
    isOpen: boolean;
    onClose: () => void;
    tweetpai?: any;
}

const TweetModal: React.FC<TweetModalProps> = ({ isOpen, onClose, tweetpai }) => {
    // Login
    const [cookies] = useCookies(["userId"]);
    const [username] = useCookies(["username"]);


    // Cadastro
    const [pseudonimo, setPseudonimo] = useState(username.username);
    const [mensagem, setMensagem] = useState("Escreva aqui seu post e cuidaremos do resto!");
    const [imagens, setImagem] = useState(" ");

    const handleSubmit = () => {
        if (!tweetpai) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    pseudonimo: pseudonimo,
                    user: cookies.userId,
                    mensagem: mensagem
                }),
            };

            fetch("http://localhost:8080/api/v1/tweets", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });

            onClose();
        } else {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    pseudonimo: pseudonimo,
                    user: cookies.userId,
                    mensagem: mensagem, 
                    paiId: tweetpai.id
                }),
            };

            fetch("http://localhost:8080/api/v1/tweets/comentario", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });

            onClose();
        }
    }

    const handleBack = () => {
        setMensagem("Escreva aqui seu post e cuidaremos do resto!");
        onClose();
    }

    return (
        <>
            <div
                className={`fixed inset-0 flex items-center justify-center z-50
                 bg-neutral-700 bg-opacity-50 ${isOpen ? "" : "hidden"
                    }`}
            >
                <div className="relative w-2/3 p-4 rounded-lg mx-auto bg-neutral-950 ">
                    <button className="right-90" onClick={handleBack}>
                        <BiArrowBack></BiArrowBack>
                    </button>
                    {tweetpai && (<div className="p-2 ">
                        <p className="">Respondendo a:</p>
                        <Tweet data={tweetpai} />
                    </div>)}
                    <TextareaAutosize
                        minRows={8}
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        className="w-full bg-neutral-900 rounded text-xl"
                    >
                    </TextareaAutosize>
                    <label className="w-full flex-row text-xl">
                        Pseudonimo a utilizar:
                        <input
                            type="text"
                            value={pseudonimo}
                            className="ml-2 bg-neutral-900 rounded w-flex"
                            onChange={(e) => setPseudonimo(e.target.value)}>
                        </input>

                        <div className="bottom-0 right-0 mt-3 ml-auto flex rounded-full gap-1 p-2 
            items-center justify-center bg-sky-500 hover:bg-opacity-80 
            transition cursor-pointer w-fit" onClick={handleSubmit}>
                            <FaBroom size={20} color="white" />
                            <p className="block text-white text-base">
                                Publique!
                            </p>
                        </div>
                    </label>


                </div>
            </div>
        </>
    );
}

export default TweetModal;