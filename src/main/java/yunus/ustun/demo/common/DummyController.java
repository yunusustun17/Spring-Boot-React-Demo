package yunus.ustun.demo.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DummyController {

    @GetMapping("/secure")
    public String get() {
        return "secure path";
    }
}
