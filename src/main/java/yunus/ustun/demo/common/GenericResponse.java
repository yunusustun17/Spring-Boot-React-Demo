package yunus.ustun.demo.common;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GenericResponse {
    @JsonView(Views.Base.class)
    private String message;
}
