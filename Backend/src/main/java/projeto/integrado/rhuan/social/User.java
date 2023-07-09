package projeto.integrado.rhuan.social;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
// import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "usuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @JsonSerialize(using = ObjectIdToStringSerializer.class)
    private ObjectId id;

    // private String link;
    private String nome;
    private Date birthday;
    private String bio;
    private String passPhrase;
    private String email;

    // // Universidade
    // @DocumentReference
    // private University univ;

    @DocumentReference
    private List<User> follow;

    @DocumentReference
    private List<Tweet> tweets;

    @DocumentReference
    private List<Notificacao> notif;

    public User(String nome, Date birthday, String bio, String passPhrase, String email) {
        // this.link = link;
        this.id = new ObjectId();
        this.nome = nome;
        this.birthday = birthday;
        this.bio = bio;
        this.passPhrase = passPhrase;
        this.email = email;
        this.follow = new LinkedList<>();
        this.tweets = new LinkedList<>();
        // this.notif = new LinkedList<>();

    }

}
