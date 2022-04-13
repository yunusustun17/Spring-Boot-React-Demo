package yunus.ustun.demo.auth.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import yunus.ustun.demo.common.ApiError;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.repository.UserRepository;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/api/1.0/auth")
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

        return ResponseEntity.ok().build();
    }
}