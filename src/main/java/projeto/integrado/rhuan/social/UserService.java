package projeto.integrado.rhuan.social;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> AllUsers() {
        return userRepository.findAll();
    }

    public User createUser(String nome, Date birthday, String bio) {
        User saida = userRepository.insert(new User(nome, birthday, bio));
        return saida;
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    // Inserir o tweet novo no usuario
    public void insertUserTweet(ObjectId id, Tweet novoTweet) {
        mongoTemplate.update(User.class)
                .matching(Criteria.where("nome").is("Rhuan"))
                .apply(new Update().push("tweets").value(novoTweet))
                .first();

    }
}
