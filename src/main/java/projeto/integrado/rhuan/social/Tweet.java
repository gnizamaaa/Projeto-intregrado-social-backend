package projeto.integrado.rhuan.social;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

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

    @DocumentReference
    private User userId;
    
    private String releaseDate;
    private String mensagem;
    private List<String> imagens;

}
