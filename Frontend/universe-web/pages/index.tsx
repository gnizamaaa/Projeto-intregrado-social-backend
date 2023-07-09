import Image from 'next/image';
import { Inter } from 'next/font/google';
import { SetStateAction, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Tweet from '@/components/Tweet';
import TweetModal from '@/components/TweetModal';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comentando, setComentando] = useState();


  const getTweets = () => {
    fetch('http://localhost:8080/api/v1/tweets')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log('Sucesso pegando os tweets');
  };

  const openModal = (tweetbase: any) => {
    setIsModalOpen(true);
    setComentando(tweetbase);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getTweets();

    const interval = setInterval(() => {
      if (
        window.scrollY <= 0 ||
        window.pageYOffset >=
        document.documentElement.scrollHeight - window.innerHeight
      ) {
        getTweets();
      }
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderComments = (comments) => {
    if (!comments) return null;

    return comments.slice().reverse().map((comment, j) => (
      <div key={j} className="ml-5 ">
        <div className='border-l-[1px] border-neutral-800'>
          <Tweet
            data={comment}
            openModal={openModal}
            closeModal={closeModal}
            modalOpen={isModalOpen}
          />
        </div>
        {renderComments(comment.comentarios)}
      </div>
    ));
  };

  return (
    <div>
      <Header label="Home" />

      {posts.slice().reverse().map((item, index) => (
        <div key={index}>
          <Tweet
            data={item}
            openModal={openModal}
            closeModal={closeModal}
            modalOpen={isModalOpen}
          />
          {renderComments(item.comentarios)}
        </div>
      ))}
      <TweetModal isOpen={isModalOpen} onClose={closeModal} tweetpai={comentando} />

    </div>
  );
}
