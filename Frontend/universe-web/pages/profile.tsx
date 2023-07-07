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

    return (
        <div>
            <Header label={'Perfil de ' + (user?.toString())} />
            <div className="profile-container">
                <div className="profile-card">
                    <h2>{userClass.nome}</h2>
                    <p>@{userClass.username}</p>
                    <p>{userClass.bio}</p>
                </div>
            </div>
            {userClass.tweets?.slice().reverse().map((item, index) => (
                <div key={index}>
                    <Tweet data={item} />
                </div>
            ))}
        </div>
    );
}
