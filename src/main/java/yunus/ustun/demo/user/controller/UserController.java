package yunus.ustun.demo.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import yunus.ustun.demo.common.GenericResponse;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.service.UserService;


@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/api/1.0/users")
    public GenericResponse createUser(@RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User created successfully");
    }

}
