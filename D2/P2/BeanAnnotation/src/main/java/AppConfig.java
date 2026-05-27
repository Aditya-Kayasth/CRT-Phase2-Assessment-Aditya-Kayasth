import org.springframework.context.annotation.Bean;

public class AppConfig {

    @Bean("s1")
    public Students gets1(){
        return new Students(1,"Aditya",25,'A');
    }

    @Bean("s2")
    public Students gets2(){
        return new Students(3,"ram",5,'c');
    }
}
