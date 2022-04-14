package yunus.ustun.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import yunus.ustun.demo.user.model.User;
import yunus.ustun.demo.user.service.UserService;

@SpringBootApplication
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
            user.setImage("https://avatars1.githubusercontent.com/u/12058981?s=460&v=4");
            userService.save(user);
        };
    }

}
