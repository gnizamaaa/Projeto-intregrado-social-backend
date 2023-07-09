import Image from 'next/image';
import { Inter } from 'next/font/google';
import { SetStateAction, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Tweet from '@/components/Tweet';
import TweetModal from '@/components/TweetModal';
import { useCookies } from 'react-cookie';
import { AiFillLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const [notif, setNotif] = useState([]);
    const [cookies] = useCookies(["userId"]);


    //Nao tenho exata certeza de como q essa funcao consegue substituir os campos [tive que pedir ajuda ao ChatGPT por nao conseguir fazer essa funcao]
    const getNotifs = () => {
        fetch('http://localhost:8080/api/v1/users/notif/' + cookies.userId)
            .then((response) => response.json())
            .then((data) => {
                const promises = data.map((item) => {
                    return fetch('http://localhost:8080/api/v1/users/' + item.atorId)
                        .then((response) => response.json())
                        .then((userData) => {
                            item.atorId = userData; // Replace atorId with the fetched data
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                });

                Promise.all(promises)
                    .then(() => {
                        setNotif(data); // Update state with modified data
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        getNotifs();
        const interval = setInterval(() => {
            if (
                window.scrollY <= 0 ||
                window.pageYOffset >=
                document.documentElement.scrollHeight - window.innerHeight
            ) {
                getNotifs();
            }
        }, 90000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="">
          <Header label="Notificações" />
      
          {notif.slice().reverse().map((item, index) => (
            <div key={index} className="border-b border-neutral-800 p-4">
              <div className="flex flex-wrap items-center mb-2">
                {item.tipo == 1 && <AiFillLike className="mr-2 mb-2 sm:mb-0" />}
                {item.tipo == 2 && <BiCommentDetail className="mr-2 mb-2 sm:mb-0" />}
                <p>{item.atorId}</p>
              </div>
              <p>{item.referenciado.mensagem}</p>
            </div>
          ))}
        </div>
      );
      
      
}
