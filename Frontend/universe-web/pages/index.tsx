import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import Tweet from '@/components/Tweet'
import TweetModal from '@/components/TweetModal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [posts, setPosts] = useState([]);

  const getTweets = () => {
    fetch('http://localhost:8080/api/v1/tweets')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log("Sucesso pegando os tweets");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    getTweets();

    const interval = setInterval(() => {
      if (window.scrollY <= 0 || window.pageYOffset >= (document.documentElement.scrollHeight - window.innerHeight)) {
        getTweets();
      }
    }, 4000);

    return () => {
      clearInterval(interval);
    };

  }, []);


  return (
    <div>
      <Header label="Home" />

      {posts.slice().reverse().map((item, index) => (
        <div key={index}>
          {/* <td>{item.userId}</td>
          <td>{item.mensagem}</td>
          <td>{item.releaseDate}</td> */}
          <Tweet data={item} openModal={openModal} closeModal={closeModal} modalOpen={isModalOpen}  />
          <TweetModal isOpen={isModalOpen} onClose={closeModal} tweetpai={item} />
        </div>
      ))}

    </div>
  )
}
