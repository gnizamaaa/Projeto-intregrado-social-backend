package projeto.integrado.rhuan.social;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        return new ResponseEntity<List<Tweet>>(tweetService.AllTweets(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Tweet>> getEspecifcTweet(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Tweet>>(tweetService.singleTweet(id), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Optional<List<Tweet>>> getUserIdTweets(@PathVariable String id) {
        return new ResponseEntity<Optional<List<Tweet>>>(tweetService.userIdTweets(id), HttpStatus.OK);
    }

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Tweet> postTweet(@RequestBody Map<String, String> payload) {
        String[] imagens = payload.get("imagens").split(" ");
        Tweet novoTweet = tweetService.createTweet(payload.get("user"), payload.get("mensagem"), imagens);

        userService.insertUserTweet(new ObjectId(payload.get("user")), novoTweet);

        return new ResponseEntity<Tweet>(
                novoTweet,
                HttpStatus.CREATED);
    }
}
