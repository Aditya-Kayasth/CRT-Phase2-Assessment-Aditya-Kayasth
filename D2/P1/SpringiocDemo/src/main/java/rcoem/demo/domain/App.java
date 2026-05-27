package rcoem.demo.domain;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) {

        ApplicationContext context = new ClassPathXmlApplicationContext("Bean.xml");

        Employee e1 = (Employee) context.getBean("Adi");

        System.out.println(e1);

    }
}
