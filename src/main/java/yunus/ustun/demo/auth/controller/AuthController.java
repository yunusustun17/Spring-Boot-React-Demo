package yunus.ustun.demo.auth.controller;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import yunus.ustun.demo.error.ApiError;
import yunus.ustun.demo.common.Views;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.repository.UserRepository;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @PostMapping("/api/1.0/auth")
    @JsonView(Views.Base.class)
    public ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization", required = false) String authorization) {
        if (authorization == null) {
            ApiError apiError = new ApiError(401, "Unauthorized", "/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }

        String base64Encoded = authorization.split("Basic ")[1];
        String decoded = new String(java.util.Base64.getDecoder().decode(base64Encoded));
        String[] decodedArray = decoded.split(":");
        String username = decodedArray[0];
        String password = decodedArray[1];

        User inDatabase = userRepository.findByUsername(username);
        if (inDatabase == null) {
            ApiError apiError = new ApiError(401, "Unauthorized", "/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }

        String hashedPassword = inDatabase.getPassword();
        if (!passwordEncoder.matches(password, hashedPassword)) {
            ApiError apiError = new ApiError(401, "Unauthorized", "/api/1.0/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(apiError);
        }

        return ResponseEntity.ok(inDatabase);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiError handleBadCredentials(BadCredentialsException e) {
        return new ApiError(401, "Unauthorized", "/api/1.0/auth");
    }
}