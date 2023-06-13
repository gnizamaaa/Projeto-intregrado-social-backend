package projeto.integrado.rhuan.social;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getallUsers() {
        return new ResponseEntity<List<User>>(userService.AllUsers(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<User> postUser(@RequestBody Map<String, String> payload) throws ParseException {
        Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(payload.get("birthday"));
        return new ResponseEntity<User>(
                userService.createUser(payload.get("nome"), date1, payload.get("bio"), payload.get("pass")),
                HttpStatus.CREATED);
    }

}
