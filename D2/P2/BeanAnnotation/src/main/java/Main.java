import org.springframework.context.annotation.AnnotationConfigApplicationContext;


public class Main {

    static void main() {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        Students std1 = (Students) context.getBean("s2");
        System.out.println(std1);

    }
}
