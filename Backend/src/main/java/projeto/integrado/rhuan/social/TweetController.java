package projeto.integrado.rhuan.social;

import java.text.ParseException;
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

    @GetMapping
    public ResponseEntity<List<Tweet>> getallTweets() {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        teste.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok().headers(teste).body(tweetService.AllTweets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Tweet>> getEspecifcTweet(@PathVariable ObjectId id) {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        teste.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok().headers(teste).body(tweetService.singleTweet(id));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Optional<List<Tweet>>> getUserIdTweets(@PathVariable String id) {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        teste.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok().headers(teste).body(tweetService.userIdTweets(id));
    }

    @CrossOrigin
    @PostMapping("/liked")
    public ResponseEntity<String> likeTweetReq(@RequestBody Map<String, String> payload) throws ParseException {
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        try {
            tweetService.likeTweet(new ObjectId(payload.get("userId")), new ObjectId(payload.get("tweetId")));
            return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body("OK!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).headers(headers).body("Erro!");

        }

    }

    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<String> postTweet(@RequestBody Map<String, String> payload) throws ParseException {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        // teste.set("Access-Control-Allow-Origin", "*");

        /// String[] imagens = payload.get("imagens").split(" ");
        String[] imagens = null;
        Tweet novoTweet = tweetService.createTweet(payload.get("user"), payload.get("mensagem"),
                payload.get("pseudonimo"), imagens);

        userService.insertUserTweet(new ObjectId(payload.get("user")), novoTweet);
        return ResponseEntity.status(HttpStatus.CREATED).headers(teste).body(novoTweet.getId().toHexString());
    }

}
