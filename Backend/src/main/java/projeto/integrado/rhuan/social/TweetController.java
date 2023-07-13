package projeto.integrado.rhuan.social;

import java.text.ParseException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/tweets")
public class TweetController {

    @Autowired
    private TweetService tweetService;

    // Obtém todos os tweets que não são comentários
    @GetMapping
    public ResponseEntity<List<Tweet>> getallTweets() {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        teste.set("Access-Control-Allow-Origin", "*");

        List<Tweet> temp = tweetService.AllTweets();
        List<Tweet> saida = new LinkedList<Tweet>();

        // Filtrar apenas os tweets que não são comentários
        for (Tweet i : temp) {
            if (i.getPaiId() == null) {
                saida.add(i);
            }
        }

        return ResponseEntity.ok().headers(teste).body(saida);
    }

    // Obtém um tweet específico pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Tweet>> getEspecifcTweet(@PathVariable ObjectId id) {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        teste.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok().headers(teste).body(tweetService.singleTweet(id));
    }

    // Obtém todos os tweets de um usuário pelo ID do usuário
    @GetMapping("/user/{id}")
    public ResponseEntity<Optional<List<Tweet>>> getUserIdTweets(@PathVariable String id) {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        teste.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok().headers(teste).body(tweetService.userIdTweets(id));
    }

    // Permite que um usuário curta um tweet
    @CrossOrigin
    @PostMapping("/liked")
    public ResponseEntity<String> likeTweetReq(@RequestBody Map<String, String> payload) throws ParseException {
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        try {
            tweetService.likeTweet(new ObjectId(payload.get("userId")), new ObjectId(payload.get("tweetId")));
            return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body("{}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).headers(headers).body(e.toString());

        }

    }

    // Permite que um usuário comente em um tweet
    @CrossOrigin
    @PostMapping("/comentario")
    public ResponseEntity<String> CommentTweetReq(@RequestBody Map<String, String> payload) throws ParseException {
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        try {
            tweetService.createComment(payload.get("user"), payload.get("mensagem"), payload.get("pseudonimo"), null,
                    new ObjectId(payload.get("paiId")));
            return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body("{}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).headers(headers).body(e.toString());

        }
    }

    @Autowired
    private UserService userService;

    // Publica um novo tweet
    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> postTweet(@RequestBody Map<String, String> payload) throws ParseException {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        // teste.set("Access-Control-Allow-Origin", "*");

        /// String[] imagens = payload.get("imagens").split(" ");
        String[] imagens = null; // Imagens ainda nao foram implementadas, logo as defino como nulo
        Tweet novoTweet = tweetService.createTweet(payload.get("user"), payload.get("mensagem"),
                payload.get("pseudonimo"), imagens);

        userService.insertUserTweet(new ObjectId(payload.get("user")), novoTweet);
        return ResponseEntity.status(HttpStatus.CREATED).headers(teste).body(novoTweet.getId().toHexString());
    }

}
