import { useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FaBroom } from "react-icons/fa";
import TextareaAutosize from 'react-textarea-autosize';


interface TweetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TweetModal: React.FC<TweetModalProps> = ({ isOpen, onClose }) => {
    // Login
    const [cookies, setCookie, removeCookie] = useCookies(["userId"]);

    // Cadastro
    const [pseudonimo, setPseudonimo] = useState(cookies.userId);
    const [mensagem, setMensagem] = useState("Escreva seu post aqui e cuidaremos do resto!");
    const [imagens, setImagem] = useState("");


    const handleSubmit = () => {
        // console.log(user);
        // console.log(password);
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
                    <button className="right-90" onClick={onClose}>
                        <BiArrowBack></BiArrowBack>
                    </button>

                    <TextareaAutosize
                        name="postContent"
                        defaultValue="Escreva seu post aqui e cuidaremos do resto!"
                        minRows={8}
                        className="w-full bg-neutral-900 rounded text-xl"
                        value={mensagem}
                    ></TextareaAutosize>
                    <label className="w-full flex-row text-xl">
                        Pseudonimo a utilizar:
                        <input
                            type="text"
                            value={pseudonimo}
                            className="ml-2 bg-neutral-900 rounded w-flex">
                        </input>

                        <div className="bottom-0 right-0 mt-3 ml-auto flex rounded-full gap-1 p-2 
            items-center justify-center bg-sky-500 hover:bg-opacity-80 
            transition cursor-pointer w-24" onClick={handleSubmit}>
                            <FaBroom size={30} color="white" />
                            <p className="lg:block text-white text-base">
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