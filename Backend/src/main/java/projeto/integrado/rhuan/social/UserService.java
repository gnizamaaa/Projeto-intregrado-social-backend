package projeto.integrado.rhuan.social;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    public Optional<User> createUser(String nome, Date birthday, String bio, String passPhrase) {

        if (!userRepository.findUserByNome(nome).isPresent()) {
            User saida = userRepository.insert(new User(nome, birthday, bio, passPhrase));
            return Optional.of(saida);
        } else
            return null;
    }

    // Retorna o ID do User, vai ser oq vai ser usado para tudo, desde post a
    // modificar o usuario dada a aleatoriedade da chave
    public Optional<String> LoginUser(String nome, String pass) {
        Optional<User> candidato = userRepository.findUserByNome(nome);
        if (candidato.get().getPassPhrase().compareTo(pass) == 0) {
            return Optional.of(candidato.get().getId().toHexString());
        } else
            return null;
    }

    public Optional<String> getUsernamebyID(String ID) {
        Optional<User> candidato = userRepository.findById(new ObjectId(ID));
        return Optional.of(candidato.get().getNome());
    }

    public Boolean isUserExist(String nome) {
        Optional<User> candidato = userRepository.findUserByNome(nome);
        if (candidato.isPresent()) {
            return true;
        } else
            return false;
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    // Inserir o tweet novo no usuario
    public void insertUserTweet(ObjectId id, Tweet novoTweet) {
        mongoTemplate.update(User.class)
                .matching(Criteria.where("_id").is(id))
                .apply(new Update().push("tweets").value(novoTweet))
                .first();

    }
}
