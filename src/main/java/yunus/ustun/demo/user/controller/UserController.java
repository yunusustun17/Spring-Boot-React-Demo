package yunus.ustun.demo.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.repository.UserRepository;


@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/1.0/users")
    public void createUser(@RequestBody User user) {
        userRepository.save(user);
    }

}
