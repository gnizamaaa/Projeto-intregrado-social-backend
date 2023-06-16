import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Header label="Home" />
      <p className='text-white'>
        Ola mundão!
      </p>
    </div>
  )
}
