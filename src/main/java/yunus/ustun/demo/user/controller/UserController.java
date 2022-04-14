package yunus.ustun.demo.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import yunus.ustun.demo.common.GenericResponse;
import yunus.ustun.demo.error.ApiError;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.service.UserService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/api/1.0/users")
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User created successfully");
    }

}
