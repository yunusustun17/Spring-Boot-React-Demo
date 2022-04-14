package yunus.ustun.demo.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserAuthService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userInDatabase = userRepository.findByUsername(username);
        if (userInDatabase == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new DemoUserDetails(userInDatabase);
    }
}
