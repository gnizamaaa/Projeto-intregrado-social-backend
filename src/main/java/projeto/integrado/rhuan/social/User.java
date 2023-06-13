package projeto.integrado.rhuan.social;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
// import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "usuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private ObjectId id;

    // private String link;
    private String nome;
    private Date birthday;
    private String bio;
    private String passPhrase;

    // // Universidade
    // @DocumentReference
    // private University univ;

    @DocumentReference
    private List<User> follow;

    @DocumentReference
    private List<Tweet> tweets;

    public User(String nome, Date birthday, String bio, String passPhrase) {
        // this.link = link;
        this.id = new ObjectId();
        this.nome = nome;
        this.birthday = birthday;
        this.bio = bio;
        this.passPhrase = passPhrase;
        this.follow = new LinkedList<>();
        this.tweets = new LinkedList<>();

    }

}
