package projeto.integrado.rhuan.social;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
// import org.springframework.data.mongodb.core.mapping.DocumentReference;

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

    private String link;
    private String nome;
    private Date birthdayString;
    private String bio;

    // // Universidade
    // @DocumentReference
    // private University univ;

    // @DocumentReference
    // private List<User> follow;

}
