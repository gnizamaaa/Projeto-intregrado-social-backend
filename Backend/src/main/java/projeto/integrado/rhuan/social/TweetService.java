package projeto.integrado.rhuan.social;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TweetService {

    @Autowired
    private TweetRepository tweetRepository;

    public List<Tweet> AllTweets() {
        return tweetRepository.findAll();
    }

    public Optional<Tweet> singleTweet(ObjectId id) {
        return tweetRepository.findById(id);
    }

    // Provavelmente nao sera usado normalmente, ja que user tera referencia para os
    // tweets mas pode vir a calhar em algum momento, estou aprendendo a implementar
    // entao achei util p aprender a buscar com outro campo e afins
    public Optional<List<Tweet>> userIdTweets(String id) {
        return tweetRepository.findTweetByUserId(id);
    }

    public Tweet createTweet(String user, String mensagem, String pseudonimo,String[] imagens) {
        return tweetRepository.insert(new Tweet(user, mensagem, pseudonimo,imagens));
    }
}
