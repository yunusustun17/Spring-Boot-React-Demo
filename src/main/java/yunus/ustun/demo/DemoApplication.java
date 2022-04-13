package yunus.ustun.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.service.UserService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner createInitialUser(UserService userService) {
        return (args) -> {
            User user = new User();
            user.setUsername("yunus");
            user.setPassword("passwd");
            user.setDisplayName("Yunus Üstün");
            userService.save(user);
        };
    }

}
