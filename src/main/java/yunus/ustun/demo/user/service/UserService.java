package yunus.ustun.demo.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void save(User user) {
        userRepository.save(user);
    }
}
