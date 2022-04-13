package yunus.ustun.demo.user.model;

import lombok.Data;
import yunus.ustun.demo.user.UniqueUsername;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue
    private long id;
    @NotNull
    @Size(min = 4, max = 21)
    @UniqueUsername
    private String username;
    @NotNull
    @Size(min = 4, max = 21)
    private String displayName;
    @NotNull
    @Size(min = 8, max = 60)
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$")
    private String password;
}
