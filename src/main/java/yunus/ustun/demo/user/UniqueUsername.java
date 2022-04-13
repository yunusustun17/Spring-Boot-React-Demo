package yunus.ustun.demo.user;

import javax.validation.Constraint;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {UniqueUsernameValidator.class}
)
public @interface UniqueUsername {
    String message() default "Bu kullanıcı adı daha önce kullanılmış";
    Class<?>[] groups() default {};
    Class<?>[] payload() default {};
}
