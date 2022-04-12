package yunus.ustun.demo.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import yunus.ustun.demo.common.ApiError;
import yunus.ustun.demo.common.GenericResponse;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.service.UserService;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/api/1.0/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        String username = user.getUsername();
        if (username == null || username.isEmpty()) {
            ApiError apiError = new ApiError(400, "Validation Error", "/api/1.0/users");
            Map<String, String> validationErrors = new HashMap<>();
            validationErrors.put("username", "Username is required");
            apiError.setValidationErrors(validationErrors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
        }

        userService.save(user);
        return ResponseEntity.ok(new GenericResponse("User created successfully"));
    }

}
