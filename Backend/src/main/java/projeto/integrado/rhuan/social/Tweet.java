package projeto.integrado.rhuan.social;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "tweets")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tweet {
    @Id
    private ObjectId id;

    private String userId;

    private String pseudonimo;

    private String releaseDate;
    private String mensagem;
    private String[] imagens;

    // @DocumentReference
    private Set<ObjectId> liked;

    public Tweet(String userId, String mensagem, String pseudonimo,String[] imagens) {
        this.releaseDate = (new Date().toString());
        this.userId = userId;
        this.mensagem = mensagem;
        this.imagens = imagens;
        this.pseudonimo = pseudonimo;
        this.liked = new HashSet<>();
    }

}
