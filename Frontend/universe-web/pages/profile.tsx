import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import Tweet from '@/components/Tweet';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [userClass, setUserClass] = useState(null);
    const { user } = router.query;

    useEffect(() => {
        if (user) {
            getUser();
        }

        const interval = setInterval(() => {
            if (window.scrollY <= 0 || window.pageYOffset >= (document.documentElement.scrollHeight - window.innerHeight)) {
                if (user) {
                    getUser();
                }
            }
        }, 9000);

        return () => {
            clearInterval(interval);
        };
    }, [user]);

    const getUser = () => {
        if (user) {
            fetch('http://localhost:8080/api/v1/users/page/' + user.toString())
                .then((response) => response.json())
                .then((data) => {
                    setUserClass(data);
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            console.log("Success fetching the user");
        }
    };

    if (!userClass) {
        return <div>Loading...</div>;
    }

    function handleFollow(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div>
            <Header label={'Perfil de ' + (user?.toString())} />
            <div className="profile-container flex justify-between items-center">
                <div className="profile-card p-2">
                    <h2 className="text-xl font-bold">{userClass.nome}</h2>
                    <p className="text-gray-600">{userClass.bio}</p>
                    <p className="text-gray-600">Seguindo: {userClass.follow.length}</p>
                </div>
                <button
                    className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full h-fit right-0"
                    onClick={handleFollow}
                >
                    Follow me
                </button>
            </div>

            {userClass.tweets?.slice().reverse().map((item, index) => (
                <div key={index}>
                    <Tweet data={item} />
                </div>
            ))}
        </div>
    );
}
