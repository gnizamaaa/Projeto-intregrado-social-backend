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

    // Retorna uma lista de todos os usuários
    public List<User> AllUsers() {
        return userRepository.findAll();
    }

    // Cria um novo usuário com os detalhes fornecidos
    public Optional<User> createUser(String nome, Date birthday, String bio, String passPhrase, String email) {

        if (!userRepository.findUserByNome(nome).isPresent()) {
            User saida = userRepository.insert(new User(nome, birthday, bio, passPhrase, email));
            return Optional.of(saida);
        } else
            return null;
    }

    // Realiza o login do usuário com o nome e senha fornecidos
    // Retorna o ID do usuário se a autenticação for bem-sucedida
    public Optional<String> LoginUser(String nome, String pass) {
        Optional<User> candidato = userRepository.findUserByNome(nome);
        if (candidato.get().getPassPhrase().compareTo(pass) == 0) {
            return Optional.of(candidato.get().getId().toHexString());
        } else
            return null;
    }

    // Obtém o nome de usuário pelo ID fornecido
    public Optional<String> getUsernamebyID(String ID) {
        Optional<User> candidato = userRepository.findById(new ObjectId(ID));
        return Optional.of(candidato.get().getNome());
    }

    // Obtém as notificações pelo ID do usuário
    public Optional<List<Notificacao>> getNotificationsByID(String ID) {
        Optional<User> candidato = userRepository.findById(new ObjectId(ID));
        return Optional.of(candidato.get().getNotif());
    }

    // Obtém o usuário pelo nome de usuário fornecido
    public Optional<User> getUserbyUsername(String name) {
        Optional<User> candidato = userRepository.findUserByNome(name);
        return Optional.of(candidato.get());
    }

    // Verifica se o usuário com o nome fornecido existe
    public Boolean isUserExist(String nome) {
        Optional<User> candidato = userRepository.findUserByNome(nome);
        if (candidato.isPresent()) {
            return true;
        } else
            return false;
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    // Insere um novo tweet no usuário com o ID fornecido
    public void insertUserTweet(ObjectId id, Tweet novoTweet) {
        mongoTemplate.update(User.class)
                .matching(Criteria.where("_id").is(id))
                .apply(new Update().push("tweets").value(novoTweet))
                .first();
    }

    // Insere uma nova notificação de tweet no usuário com o ID fornecido
    public void insertNotifTweet(ObjectId id, Notificacao novaNotificacao) {
        mongoTemplate.update(User.class)
                .matching(Criteria.where("_id").is(id))
                .apply(new Update().push("notif").value(novaNotificacao))
                .first();

    }
}
