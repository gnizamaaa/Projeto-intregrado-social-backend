package projeto.integrado.rhuan.social;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getallUsers() {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        // teste.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok().headers(teste).body(userService.AllUsers());
    }

    @GetMapping("/page/{name}")
    public ResponseEntity<Optional<User>> getUserByUsername(@PathVariable String name) {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        // teste.set("Access-Control-Allow-Origin", "*");
        return ResponseEntity.ok().headers(teste).body(userService.getUserbyUsername(name));
    }

    @GetMapping("/{nome}/{pass}")
    public ResponseEntity<Optional<String>> UserLogin(@PathVariable String nome, @PathVariable String pass) {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        // teste.set("Access-Control-Allow-Origin", "*");
        if (userService.LoginUser(nome, pass).isPresent()) {
            return ResponseEntity.ok().headers(teste).body(userService.LoginUser(nome, pass));
        } else {
            return ResponseEntity.badRequest().headers(teste).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<String>> getUsernameByID(@PathVariable String id) {
        org.springframework.http.HttpHeaders teste = new org.springframework.http.HttpHeaders();
        // teste.set("Access-Control-Allow-Origin", "*");
        return ResponseEntity.ok().headers(teste).body(userService.getUsernamebyID(id));
    }

    @PostMapping
    public ResponseEntity<String> postUser(@RequestBody Map<String, String> payload) throws ParseException {
        Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(payload.get("birthday"));

        // Create the response headers and set the necessary CORS headers
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        // headers.set("Access-Control-Allow-Origin", "*");

        // Modify the response creation to include the headers and response body
        if (!userService.isUserExist(payload.get("nome"))) {
            Optional<User> temp = userService.createUser(payload.get("nome"), date1, payload.get("bio"),
                    payload.get("pass"), payload.get("email"));
            if (temp.isPresent()) {
                return ResponseEntity.status(HttpStatus.CREATED).headers(headers)
                        .body(temp.get().getId().toHexString());
            }
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).headers(headers)
                .body(null);

    }

}
