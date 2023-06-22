import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [posts, setPosts] = useState([]);
   useEffect(() => {
      fetch('http://localhost:8080/api/v1/tweets')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
  return (
    <div>
      <Header label="Home" />
      <p className='text-white'>
        Ola mundão!
      </p>
    </div>
  )
}
