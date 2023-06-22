package projeto.integrado.rhuan.social;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TweetRepository extends MongoRepository<Tweet, ObjectId> {
    public Optional<List<Tweet>> findTweetByUserId(String userId);
}
