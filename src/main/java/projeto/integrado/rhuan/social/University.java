package projeto.integrado.rhuan.social;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "universidades")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class University {
    @Id
    private ObjectId id;
    
    private String nome;

    @DocumentReference
    private List<User> alunos;
}
