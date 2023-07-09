package projeto.integrado.rhuan.social;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "notificacoes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notificacao {
    @Id
    @JsonSerialize(using = ObjectIdToStringSerializer.class)
    private ObjectId id;

    /**
     * Em caso de like o post curtido, em caso de comentario o post comentado
     */
    @DocumentReference
    private Tweet referenciado;

    // @DocumentReference
    private String atorId;

    /**
     * Notacao utilizada para codificar os tipos:
     * 1 -- Like
     * 2 -- Comentario
     */
    private char tipo;

    public Notificacao(Tweet referenciado, String ator, char tipo) {
        this.id = new ObjectId();
        this.referenciado = referenciado;
        this.atorId = ator;
        this.tipo = tipo;
    }

}
