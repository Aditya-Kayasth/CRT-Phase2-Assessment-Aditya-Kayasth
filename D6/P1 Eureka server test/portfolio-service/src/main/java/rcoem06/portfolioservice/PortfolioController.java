package rcoem06.portfolioservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/summary")
    public Map<String, Object> getPortfolioSummary() {
        // 1. We ask the LoadBalanced RestTemplate to call the market-data-service BY NAME
        String marketDataUrl = "http://MARKET-DATA-SERVICE/api/market/nifty50";

        // 2. It automatically asks Eureka for the IP, makes the call, and fetches the JSON
        Map<String, Object> marketData = restTemplate.getForObject(marketDataUrl, Map.class);

        // 3. We combine that fetched data with our own dummy portfolio logic
        Map<String, Object> response = new HashMap<>();
        response.put("userId", "user_123");
        response.put("portfolioValue", "₹ 15,00,000");
        response.put("liveMarketContext", marketData); // Injecting the data from the other microservice

        return response;
    }
}