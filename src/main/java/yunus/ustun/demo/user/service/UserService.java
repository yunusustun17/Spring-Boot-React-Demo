package yunus.ustun.demo.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    // TODO: 12.04.2022 initialize password encoder with spring boot
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
