package rcoem06.portfolioservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
public class PortfolioServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioServiceApplication.class, args);
    }

    // This creates our "Smart Dialer"
    @Bean
    @LoadBalanced
    // <-- This annotation is the magic. It tells Spring to intercept requests and look up names in Eureka!
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
