package projeto.integrado.rhuan.social;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    public Notificacao createNotificacao(Tweet referenciado, String ator, char tipo) {
        return notificacaoRepository.insert(new Notificacao(referenciado, ator, tipo));
    }
}
