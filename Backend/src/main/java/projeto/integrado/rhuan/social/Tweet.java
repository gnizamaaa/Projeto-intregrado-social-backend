package projeto.integrado.rhuan.social;

import java.util.Date;
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

    //TODO: Implementar quando chegar em casa [ter acesso ao banco de forma mais visual]
    //private String pseudonimo;

    private String releaseDate;
    private String mensagem;
    private String[] imagens;

    public Tweet(String userId, String mensagem, String[] imagens) {
        this.releaseDate = (new Date().toString());
        this.userId = userId;
        this.mensagem = mensagem;
        this.imagens = imagens;
    }

}
