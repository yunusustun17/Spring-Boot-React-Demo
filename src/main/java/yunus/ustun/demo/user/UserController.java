package yunus.ustun.demo.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/api/1.0/users")
    public void createUser(@RequestBody User user) {
        log.info("User: {}", user.toString());
    }

}
