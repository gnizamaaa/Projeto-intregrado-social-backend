import React, { useState } from 'react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform login logic here
        // ...
        onClose(); // Close the modal after successful login
    };

    return (
        <>
            <div
                className={`fixed inset-0 flex items-center justify-center z-50 bg-neutral-600 bg-opacity-80 ${isOpen ? '' : 'hidden'
                    }`} onClick={onClose}>
                <div className="relative w-fit p-4 rounded-lg mx-auto bg-neutral-800">
                    <p className="w-fit text-xl p-2"> Entre seus dados de login ou cadastre-se</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="border-r-2 border-slate-500 p-2">
                            <p>Login:</p>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 font-medium">
                                    Usuário
                                </label>
                                <input
                                    type="user"
                                    id="user"
                                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 font-medium">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Login
                            </button>
                        </div>
                        <div>
                            <p>Cadastro:</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginModal;
