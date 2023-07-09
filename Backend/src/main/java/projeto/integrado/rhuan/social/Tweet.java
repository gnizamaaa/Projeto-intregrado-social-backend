package projeto.integrado.rhuan.social;

import java.util.Date;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "tweets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tweet {
    @Id
    @JsonSerialize(using = ObjectIdToStringSerializer.class)
    private ObjectId id;

    private String userId;

    private String pseudonimo;

    private String releaseDate;
    private String mensagem;
    private String[] imagens;

    //@DocumentReference
    private Set<ObjectId> liked;

    private ObjectId paiId; // Quando eh um comentario, pai eh o tweet original

    @DocumentReference
    private List<Tweet> comentarios;

    public Tweet(String userId, String mensagem, String pseudonimo, String[] imagens) {
        this.releaseDate = (new Date().toString());
        this.userId = userId;
        this.mensagem = mensagem;
        this.imagens = imagens;
        this.pseudonimo = pseudonimo;
        this.liked = new HashSet<>();
        this.comentarios = new LinkedList<>();
    }

    public Tweet(String userId, String mensagem, String pseudonimo, String[] imagens, Tweet pai) {
        this.releaseDate = (new Date().toString());
        this.userId = userId;
        this.mensagem = mensagem;
        this.imagens = imagens;
        this.pseudonimo = pseudonimo;
        this.paiId = pai.getId();
        this.liked = new HashSet<>();
        this.comentarios = new LinkedList<>();
    }

}
