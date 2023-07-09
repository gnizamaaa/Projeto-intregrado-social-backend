package projeto.integrado.rhuan.social;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
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

    public Tweet createTweet(String user, String mensagem, String pseudonimo, String[] imagens) {
        return tweetRepository.insert(new Tweet(user, mensagem, pseudonimo, imagens));
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private NotificacaoService notificacaoService;

    @Autowired
    private UserService userService;

    public Tweet createComment(String user, String mensagem, String pseudonimo, String[] imagens, ObjectId pai) {

        Tweet novo = new Tweet(user, mensagem, pseudonimo, imagens, tweetRepository.findById(pai).get());
        tweetRepository.insert(novo);

        // Colocar na lista de comentarios do pai
        mongoTemplate.update(Tweet.class)
                .matching(Criteria.where("_id").is(pai))
                .apply(new Update().push("comentarios").value(novo))
                .first();

        Optional<Tweet> gostado = tweetRepository.findById(pai);

        String donoTweetGostado = gostado.get().getUserId();

        Notificacao novanotif = notificacaoService.createNotificacao(gostado.get(),
                donoTweetGostado, '2');

        userService.insertNotifTweet(new ObjectId(donoTweetGostado), novanotif);
        return novo;
    }

    // Inserir o tweet novo no usuario
    public void likeTweet(ObjectId userId, ObjectId likedTweetId) {
        Optional<Tweet> gostado = tweetRepository.findById(likedTweetId);
        if (!gostado.get().getLiked().contains(userId)) {
            mongoTemplate.update(Tweet.class)
                    .matching(Criteria.where("_id").is(likedTweetId))
                    .apply(new Update().push("liked").value(userId))
                    .first();

            String donoTweetGostado = gostado.get().getUserId();

            Notificacao novanotif = notificacaoService.createNotificacao(gostado.get(),
                    donoTweetGostado, '1');

            userService.insertNotifTweet(new ObjectId(donoTweetGostado), novanotif);
        }
    }
}
