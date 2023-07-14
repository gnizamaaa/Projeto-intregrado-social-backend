import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineClose } from "react-icons/ai";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Componente de modal de login
const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  // Login
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [username, setUsername] = useCookies(["username"]);


  // Cadastro
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  // Função para lidar com o envio do formulario de login
  const handleSubmit = () => {
    fetch("http://localhost:8080/api/v1/users/" + user + "/" + password)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCookie("userId", data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    if (cookies.userId != null) {
      setUsername("username", user);
      onClose(); // Fechar o modal apos o login bem-sucedido
    }
  };

  // Função para lidar com o envio do formulário de cadastro
  const handleCadastro = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        nome: user,
        pass: password,
        email: email,
        birthday: birthday,
        bio: bio,
      }),
    };

    fetch("http://localhost:8080/api/v1/users", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCookie("userId", data);
        if (data.userId != null) {
          onClose();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    if (cookies.userId != null) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 bg-neutral-600 bg-opacity-80 ${isOpen ? "" : "hidden"
          }`}
      >
        <div className="relative w-flex p-4 rounded-lg mx-auto bg-neutral-800">
          <button className="right-90" onClick={onClose}>
            <AiOutlineClose></AiOutlineClose>
          </button>
          <p className="w-fit text-xl p-2">
            {" "}
            Entre seus dados de login ou cadastre-se
          </p>
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="border-r-2 border-slate-500">
              <div className=" mr-2">
                <p className="text-l mb-3 ">Login:</p>
                <div className="block mb-2  ">
                  <label htmlFor="email" className="block mb-2  ">
                    Usuário
                    <input
                      type="user"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
                    />
                  </label>
                </div>
                <div className="block mb-2  ">
                  <label htmlFor="password" className="block mb-2  ">
                    Senha
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </div>

            <div className="">
              <p className="text-l mb-3">Cadastro:</p>
              <div>
                <div>
                  <label className="block mb-2  ">
                    Usuario:
                    <input
                      type={"text"}
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-2  ">
                    Email:
                    <input
                      type={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-2  ">
                    Senha:
                    <input
                      type={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
                    />
                  </label>
                </div>
                <div>
                  <label className="block mb-2  ">
                    Data de nascimento:
                    <input
                      type={"date"}
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Bio:
                    <input
                      type={"text"}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none"
                    />
                  </label>
                </div>
                <div className="my-2">
                  <button
                    type="submit"
                    className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={handleCadastro}
                  >
                    Cadastre-se
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
